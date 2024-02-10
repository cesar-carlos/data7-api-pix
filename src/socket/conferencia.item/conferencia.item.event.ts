import { Server as SocketIOServer, Socket } from 'socket.io';

import ConferenciaItemRepository from './conferencia.item.repository';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import ExpedicaoItemConferenciaConsultaDto from '../../dto/expedicao/expedicao.item.conferencia.consulta.dto';
import CarrinhoPercursoEstagioRepository from '../carrinho.percurso.estagio/carrinho.percurso.estagio.repository';
import ExpedicaoItemConferirConsultaDto from '../../dto/expedicao/expedicao.item.conferir.consulta.dto';
import ExpedicaoItemConferenciaDto from '../../dto/expedicao/expedicao.item.conferencia.dto';
import ExpedicaoItemConferirDto from '../../dto/expedicao/expedicao.item.conferir.dto';
import ExpedicaoItemSituacaoModel from '../../model/expedicao.item.situacao.model';
import ConferirItemRepository from '../conferir.item/conferir.item.repository';

type ProdutoConferir = {
  CodEmpresa: number;
  CodConferir: number;
  CodCarrinho: number;
  CodProduto: number;
};

type CarrinhoPercursoEstagioParams = {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  ItemCarrinhoPercurso: string;
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

        const result = await this.repository.consulta();
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
          await this.repository.insert([el]);

          const inerted = await this.repository.select(`
            CodEmpresa = ${el.CodEmpresa}
              AND CodConferir = ${el.CodConferir}
              AND SessionId = '${el.SessionId}'
              AND CodConferente = ${el.CodConferente}
            ORDER BY Item `);

          try {
            el.Item = inerted[inerted.length - 1].Item;
          } catch (error: any) {
            throw new Error('Erro ao inserir ' + error.message);
          }

          const codCarrinho = await this.getCodCarrinho({
            CodEmpresa: el.CodEmpresa,
            CodCarrinhoPercurso: el.CodCarrinhoPercurso,
            ItemCarrinhoPercurso: el.ItemCarrinhoPercurso,
          });

          const isExist = produtoConferir.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa &&
              sel.CodConferir == el.CodConferir &&
              sel.CodCarrinho == codCarrinho &&
              sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtoConferir.push({
              CodEmpresa: el.CodEmpresa,
              CodConferir: el.CodConferir,
              CodCarrinho: codCarrinho,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensConferirConsulta: ExpedicaoItemConferirConsultaDto[] = [];
        for (const el of produtoConferir) {
          const params = `
              CodEmpresa = ${el.CodEmpresa}
            AND CodConferir = ${el.CodConferir}
            AND CodCarrinho = ${el.CodCarrinho}
            AND CodProduto = '${el.CodProduto}' `;

          const itensConferenciaConsultaProdutoCarrinho = await this.repository.consulta(params);
          const sumQtdConferida = itensConferenciaConsultaProdutoCarrinho.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const conferirItemRepository = new ConferirItemRepository();
          const itensConferirProdutoCarrinho = await conferirItemRepository.consulta(params);

          if (itensConferirProdutoCarrinho.length > 0) {
            const itemConferirProdutoCarrinho = ExpedicaoItemConferirDto.fromConsulta(
              itensConferirProdutoCarrinho.shift()!,
            );

            itemConferirProdutoCarrinho.QuantidadeConferida = sumQtdConferida;
            await conferirItemRepository.update([itemConferirProdutoCarrinho]);
          }

          const conferirItensConsultaProdutoCarrinho = await conferirItemRepository.consulta(params);
          itensConferirConsulta.push(...conferirItensConsultaProdutoCarrinho);
        }

        const itensConferenciaConsulta: ExpedicaoItemConferenciaConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
          AND CodConferir = ${el.CodConferir}
          AND Item = '${el.Item}' `;

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
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferencia.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferencia.item.update`;
      const mutation = json['mutation'];

      try {
        const produtoConferir: ProdutoConferir[] = [];
        const itensMutation = this.convert(mutation);

        for (const el of itensMutation) {
          await this.repository.update([el]);

          const codCarrinho = await this.getCodCarrinho({
            CodEmpresa: el.CodEmpresa,
            CodCarrinhoPercurso: el.CodCarrinhoPercurso,
            ItemCarrinhoPercurso: el.ItemCarrinhoPercurso,
          });

          const isExist = produtoConferir.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa &&
              sel.CodConferir == el.CodConferir &&
              sel.CodCarrinho == codCarrinho &&
              sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtoConferir.push({
              CodEmpresa: el.CodEmpresa,
              CodConferir: el.CodConferir,
              CodCarrinho: codCarrinho,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensConferirConsulta: ExpedicaoItemConferirConsultaDto[] = [];
        for (const el of produtoConferir) {
          const params = `
              CodEmpresa = ${el.CodEmpresa}
            AND CodConferir = ${el.CodConferir}
            AND CodCarrinho = ${el.CodCarrinho}
            AND CodProduto = '${el.CodProduto}'

          `;

          const itensConferenciaConsultaProdutoCarrinho = await this.repository.consulta(params);
          const sumQtdConferida = itensConferenciaConsultaProdutoCarrinho.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const conferirItemRepository = new ConferirItemRepository();
          const itensConferirProdutoCarrinho = await conferirItemRepository.consulta(params);

          if (itensConferirProdutoCarrinho.length > 0) {
            const itemConferirProdutoCarrinho = ExpedicaoItemConferirDto.fromConsulta(
              itensConferirProdutoCarrinho.shift()!,
            );

            itemConferirProdutoCarrinho.QuantidadeConferida = sumQtdConferida;
            await conferirItemRepository.update([itemConferirProdutoCarrinho]);
          }

          const conferirItensConsultaProdutoCarrinho = await conferirItemRepository.consulta(params);
          itensConferirConsulta.push(...conferirItensConsultaProdutoCarrinho);
        }

        const itensConferenciaConsulta: ExpedicaoItemConferenciaConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
          AND CodConferir = ${el.CodConferir}
          AND Item = '${el.Item}'

          `;

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
        const produtoConferir: ProdutoConferir[] = [];
        const itensMutation = this.convert(mutation);

        const itensConferenciaConsulta: ExpedicaoItemConferenciaConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
          AND CodConferir = ${el.CodConferir}
          AND Item = '${el.Item}'`;

          const result = await this.repository.consulta(params);
          itensConferenciaConsulta.push(...result);
        }

        for (const el of itensMutation) {
          await this.repository.delete([el]);

          const codCarrinho = await this.getCodCarrinho({
            CodEmpresa: el.CodEmpresa,
            CodCarrinhoPercurso: el.CodCarrinhoPercurso,
            ItemCarrinhoPercurso: el.ItemCarrinhoPercurso,
          });

          const isExist = produtoConferir.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa &&
              sel.CodConferir == el.CodConferir &&
              sel.CodCarrinho == codCarrinho &&
              sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtoConferir.push({
              CodEmpresa: el.CodEmpresa,
              CodConferir: el.CodConferir,
              CodCarrinho: codCarrinho,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensConferirConsulta: ExpedicaoItemConferirConsultaDto[] = [];
        for (const el of produtoConferir) {
          const params = `
              CodEmpresa = ${el.CodEmpresa}
            AND CodConferir = ${el.CodConferir}
            AND CodCarrinho = ${el.CodCarrinho}
            AND CodProduto = '${el.CodProduto}'

          `;

          const itensConferenciaConsultaProdutoCarrinho = await this.repository.consulta(params);
          const sumQtdConferida = itensConferenciaConsultaProdutoCarrinho.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const conferirItemRepository = new ConferirItemRepository();
          const itensConferirProdutoCarrinho = await conferirItemRepository.consulta(params);

          if (itensConferirProdutoCarrinho.length > 0) {
            const itemConferirProdutoCarrinho = ExpedicaoItemConferirDto.fromConsulta(
              itensConferirProdutoCarrinho.shift()!,
            );

            itemConferirProdutoCarrinho.QuantidadeConferida = sumQtdConferida;
            await conferirItemRepository.update([itemConferirProdutoCarrinho]);
          }

          const conferirItensConsultaProdutoCarrinho = await conferirItemRepository.consulta(params);
          itensConferirConsulta.push(...conferirItensConsultaProdutoCarrinho);
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

  private async getCodCarrinho(params: CarrinhoPercursoEstagioParams): Promise<number> {
    const repository = new CarrinhoPercursoEstagioRepository();
    const result = await repository.select([
      { key: 'CodEmpresa', value: params.CodEmpresa },
      { key: 'CodCarrinhoPercurso', value: params.CodCarrinhoPercurso },
      { key: 'Item', value: params.ItemCarrinhoPercurso },
    ]);

    return result?.shift()?.CodCarrinho ?? 0;
  }
}
