import { Server as SocketIOServer, Socket } from 'socket.io';

import ConferenciaItemRepository from './conferencia.item.repository';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import ExpedicaoItemConferenciaConsultaDto from '../../dto/expedicao/expedicao.item.conferencia.consulta.dto';
import ExpedicaoItemConferirConsultaDto from '../../dto/expedicao/expedicao.item.conferir.consulta.dto';
import ExpedicaoItemConferenciaDto from '../../dto/expedicao/expedicao.item.conferencia.dto';
import ConferirItemRepository from '../conferir.item/conferir.item.repository';
import ExpedicaoItemSituacaoModel from '../../model/expedicao.item.situacao.model';

type ProdutoConferir = {
  CodEmpresa: number;
  CodConferir: number;
  CodProduto: number;
};

export default class ConferenciaItemEvent {
  private repository = new ConferenciaItemRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} conferencia.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferencia.item.consulta`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.consulta(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.select();
        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferencia.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferencia.item.select`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.select(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.select();
        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferencia.item.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferencia.item.insert`;
      const mutation = json['mutation'];

      try {
        const produtoConferir: ProdutoConferir[] = [];
        const itensMutation = this.convert(mutation);

        for (const el of itensMutation) {
          el.Item = await this.lestItem(el.CodEmpresa, el.CodConferir);
          await this.repository.insert([el]);

          const isExist = produtoConferir.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa && sel.CodConferir == el.CodConferir && sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtoConferir.push({
              CodEmpresa: el.CodEmpresa,
              CodConferir: el.CodConferir,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensConferirConsulta: ExpedicaoItemConferirConsultaDto[] = [];
        for (const el of produtoConferir) {
          const params = `CodEmpresa = ${el.CodEmpresa} AND CodConferir = ${el.CodConferir} AND CodProduto = ${el.CodProduto}`;
          const conferidos = await this.repository.select(params);

          const sumQtdConferida = conferidos.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const conferirItemRepository = new ConferirItemRepository();
          const conferirItem = await conferirItemRepository.select(params);

          if (conferirItem.length > 0) {
            const item = conferirItem.shift()!;
            item.QuantidadeConferida = sumQtdConferida;
            await conferirItemRepository.update([item]);
          }

          const conferirItensConsulta = await conferirItemRepository.consulta(params);
          itensConferirConsulta.push(...conferirItensConsulta);
        }

        const itensConferenciaConsulta: ExpedicaoItemConferenciaConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `CodEmpresa = ${el.CodEmpresa} AND CodConferir = ${el.CodConferir} AND Item = '${el.Item}'`;
          const result = await this.repository.consulta(params);
          itensConferenciaConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensMutation.map((item) => item.toJson()),
        });

        const basicEventItensConferenciaConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensConferenciaConsulta.map((item) => item.toJson()),
        });

        const basicEventItensConferirConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensConferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferencia.item.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('conferencia.item.insert.listen', JSON.stringify(basicEventItensConferenciaConsulta.toJson()));
        io.emit('conferir.item.update.listen', JSON.stringify(basicEventItensConferirConsulta.toJson()));
      } catch (error) {
        console.log(error);
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferencia.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferencia.item.update`;
      const mutation = json['mutation'];

      try {
        const produtosConferido: ProdutoConferir[] = [];
        const itensMutation = this.convert(mutation);

        for (const el of itensMutation) {
          await this.repository.update([el]);

          const isExist = produtosConferido.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa && sel.CodConferir == el.CodConferir && sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtosConferido.push({
              CodEmpresa: el.CodEmpresa,
              CodConferir: el.CodConferir,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensConferirConsulta: ExpedicaoItemConferirConsultaDto[] = [];
        for (const el of produtosConferido) {
          const params = `CodEmpresa = ${el.CodEmpresa} AND CodConferir = ${el.CodConferir} AND CodProduto = ${el.CodProduto}`;
          const conferidos = await this.repository.select(params);

          const sumQtdConferida = conferidos.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const conferirItemRepository = new ConferirItemRepository();
          const conferirItem = await conferirItemRepository.select(params);

          if (conferirItem.length > 0) {
            const item = conferirItem.shift()!;
            item.QuantidadeConferida = sumQtdConferida;
            await conferirItemRepository.update([item]);
          }

          const conferirItensConsulta = await conferirItemRepository.consulta(params);
          itensConferirConsulta.push(...conferirItensConsulta);
        }

        const itensConferenciaConsulta: ExpedicaoItemConferenciaConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `CodEmpresa = ${el.CodEmpresa} AND CodConferir = ${el.CodConferir} AND Item = '${el.Item}'`;
          const result = await this.repository.consulta(params);
          itensConferenciaConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensMutation.map((item) => item.toJson()),
        });

        const basicEventItensConferenciaConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensConferenciaConsulta.map((item) => item.toJson()),
        });

        const basicEventItensConferirConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensConferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferencia.item.update', JSON.stringify(basicEvent.toJson()));
        io.emit('conferencia.item.update.listen', JSON.stringify(basicEventItensConferenciaConsulta.toJson()));
        io.emit('conferir.item.update.listen', JSON.stringify(basicEventItensConferirConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferencia.item.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferencia.item.delete`;
      const mutation = json['mutation'];

      try {
        const produtosConferido: ProdutoConferir[] = [];
        const itensMutation = this.convert(mutation);

        const itensConferenciaConsulta: ExpedicaoItemConferenciaConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `CodEmpresa = ${el.CodEmpresa} AND CodConferir = ${el.CodConferir} AND Item = '${el.Item}'`;
          const result = await this.repository.consulta(params);
          itensConferenciaConsulta.push(...result);
        }

        for (const el of itensMutation) {
          await this.repository.delete([el]);

          const isExist = produtosConferido.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa && sel.CodConferir == el.CodConferir && sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtosConferido.push({
              CodEmpresa: el.CodEmpresa,
              CodConferir: el.CodConferir,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensConferirConsulta: ExpedicaoItemConferirConsultaDto[] = [];
        for (const el of produtosConferido) {
          const params = `CodEmpresa = ${el.CodEmpresa} AND CodConferir = ${el.CodConferir} AND CodProduto = ${el.CodProduto}`;
          const conferidos = await this.repository.select(params);

          const sumQtdConferida = conferidos.reduce((acc, cur) => {
            return cur.Situacao != 'CA' ? acc + cur.Quantidade : acc;
          }, 0);

          const conferirItemRepository = new ConferirItemRepository();
          const conferirItem = await conferirItemRepository.select(params);

          if (conferirItem.length > 0) {
            const item = conferirItem.shift()!;
            item.QuantidadeConferida = sumQtdConferida;
            await conferirItemRepository.update([item]);
          }

          const conferirItensConsulta = await conferirItemRepository.consulta(params);
          itensConferirConsulta.push(...conferirItensConsulta);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensMutation.map((item) => item.toJson()),
        });

        const basicEventItensConferenciaConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensConferenciaConsulta.map((item) => item.toJson()),
        });

        const basicEventItensConferirConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensConferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferencia.item.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('conferencia.item.delete.listen', JSON.stringify(basicEventItensConferenciaConsulta.toJson()));
        io.emit('conferir.item.update.listen', JSON.stringify(basicEventItensConferirConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoItemConferenciaDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemConferenciaDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }

  private async lestItem(codEmpresa: number, codConferir: number): Promise<string> {
    const itens = await this.repository.select([
      { key: 'CodEmpresa', value: codEmpresa },
      { key: 'CodConferir', value: codConferir },
    ]);

    if (itens.length == 0) return '00001';
    const list = itens.map((item) => item.Item);
    const max = Math.max(...list.map((item) => Number(item)));
    return String(max + 1).padStart(5, '0');
  }
}
