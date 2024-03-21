import { Server as SocketIOServer, Socket } from 'socket.io';

import SeparacaoItemRepository from './separacao.item.repository';
import SepararItemRepository from '../separar.item/separar.item.repository';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import ExpedicaoItemSeparacaoConsultaDto from '../../dto/expedicao/expedicao.item.separacao.consulta.dto';
import ExpedicaoItemSepararConsultaDto from '../../dto/expedicao/expedicao.item.separar.consulta.dto';
import ExpedicaoBasicErrorEventDto from '../../dto/expedicao/expedicao.basic.error.event.dto';
import ExpedicaoItemSeparacaoDto from '../../dto/expedicao/expedicao.item.separacao.dto';
import ExpedicaoItemSituacaoModel from '../../model/expedicao.item.situacao.model';

type ProdutoSeparar = {
  CodEmpresa: number;
  CodSepararEstoque: number;
  CodProduto: number;
};

export default class SeparacaoItemEvent {
  private repository = new SeparacaoItemRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} separacao.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.consulta`;
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
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} separacao.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.select`;
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
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} separacao.item.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.insert`;
      const mutation = json['mutation'];

      try {
        const produtosSeparado: ProdutoSeparar[] = [];
        const itensMutation = this.convert(mutation);

        for (const el of itensMutation) {
          await this.repository.insert([el]);

          const inerted = await this.repository.select(`
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND SessionId = '${el.SessionId}'
              AND CodSeparador = ${el.CodSeparador}
            ORDER BY Item `);

          try {
            el.Item = inerted[inerted.length - 1].Item;
          } catch (error: any) {
            throw new Error('Erro ao inserir ' + error.message);
          }

          const isExist = produtosSeparado.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa &&
              sel.CodSepararEstoque == el.CodSepararEstoque &&
              sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtosSeparado.push({
              CodEmpresa: el.CodEmpresa,
              CodSepararEstoque: el.CodSepararEstoque,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensSepararConsulta: ExpedicaoItemSepararConsultaDto[] = [];
        for (const el of produtosSeparado) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND CodProduto = ${el.CodProduto} `;

          const separados = await this.repository.select(params);

          const sumQtdSeparada = separados.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const separarItemRepository = new SepararItemRepository();
          const separarItem = await separarItemRepository.select(params);

          if (separarItem.length > 0) {
            const item = separarItem.shift()!;
            item.QuantidadeSeparacao = sumQtdSeparada;
            await separarItemRepository.update([item]);
          }

          const separarItensConsulta = await separarItemRepository.consulta(params);
          itensSepararConsulta.push(...separarItensConsulta);
        }

        const itensSeparacaoConsulta: ExpedicaoItemSeparacaoConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND Item = '${el.Item}' `;

          const result = await this.repository.consulta(params);
          itensSeparacaoConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensMutation.map((item) => item.toJson()),
        });

        const basicEventItensSeparacaoConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSeparacaoConsulta.map((item) => item.toJson()),
        });

        const basicEventItensSepararConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSepararConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separacao.item.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('separacao.item.insert.listen', JSON.stringify(basicEventItensSeparacaoConsulta.toJson()));
        io.emit('separar.item.update.listen', JSON.stringify(basicEventItensSepararConsulta.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} separacao.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.update`;
      const mutation = json['mutation'];

      try {
        const produtosSeparado: ProdutoSeparar[] = [];
        const itensMutation = this.convert(mutation);

        for (const el of itensMutation) {
          await this.repository.update([el]);

          const isExist = produtosSeparado.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa &&
              sel.CodSepararEstoque == el.CodSepararEstoque &&
              sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtosSeparado.push({
              CodEmpresa: el.CodEmpresa,
              CodSepararEstoque: el.CodSepararEstoque,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensSepararConsulta: ExpedicaoItemSepararConsultaDto[] = [];
        for (const el of produtosSeparado) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND CodProduto = ${el.CodProduto}`;

          const separados = await this.repository.select(params);

          const sumQtdSeparada = separados.reduce((acc, cur) => {
            return cur.Situacao != ExpedicaoItemSituacaoModel.cancelado ? acc + cur.Quantidade : acc;
          }, 0);

          const separarItemRepository = new SepararItemRepository();
          const separarItem = await separarItemRepository.select(params);

          if (separarItem.length > 0) {
            const item = separarItem.shift()!;
            item.QuantidadeSeparacao = sumQtdSeparada;
            await separarItemRepository.update([item]);
          }

          const separarItensConsulta = await separarItemRepository.consulta(params);
          itensSepararConsulta.push(...separarItensConsulta);
        }

        const itensSeparacaoConsulta: ExpedicaoItemSeparacaoConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND Item = '${el.Item}'`;

          const result = await this.repository.consulta(params);
          itensSeparacaoConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensMutation.map((item) => item.toJson()),
        });

        const basicEventItensSeparacaoConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSeparacaoConsulta.map((item) => item.toJson()),
        });

        const basicEventItensSepararConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSepararConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separacao.item.update', JSON.stringify(basicEvent.toJson()));
        io.emit('separacao.item.update.listen', JSON.stringify(basicEventItensSeparacaoConsulta.toJson()));
        io.emit('separar.item.update.listen', JSON.stringify(basicEventItensSepararConsulta.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} separacao.item.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.delete`;
      const mutation = json['mutation'];

      try {
        const produtosSeparado: ProdutoSeparar[] = [];
        const itensMutation = this.convert(mutation);

        const itensSeparacaoConsulta: ExpedicaoItemSeparacaoConsultaDto[] = [];
        for (const el of itensMutation) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND Item = '${el.Item}'`;

          const result = await this.repository.consulta(params);
          itensSeparacaoConsulta.push(...result);
        }

        for (const el of itensMutation) {
          await this.repository.delete([el]);

          const isExist = produtosSeparado.findIndex(
            (sel) =>
              sel.CodEmpresa == el.CodEmpresa &&
              sel.CodSepararEstoque == el.CodSepararEstoque &&
              sel.CodProduto == el.CodProduto,
          );

          if (isExist == -1) {
            produtosSeparado.push({
              CodEmpresa: el.CodEmpresa,
              CodSepararEstoque: el.CodSepararEstoque,
              CodProduto: el.CodProduto,
            });
          }
        }

        const itensSepararConsulta: ExpedicaoItemSepararConsultaDto[] = [];
        for (const el of produtosSeparado) {
          const params = `
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND CodProduto = ${el.CodProduto}`;

          const separados = await this.repository.select(params);

          const sumQtdSeparada = separados.reduce((acc, cur) => {
            return cur.Situacao != 'CA' ? acc + cur.Quantidade : acc;
          }, 0);

          const separarItemRepository = new SepararItemRepository();
          const separarItem = await separarItemRepository.select(params);

          if (separarItem.length > 0) {
            const item = separarItem.shift()!;
            item.QuantidadeSeparacao = sumQtdSeparada;
            await separarItemRepository.update([item]);
          }

          const separarItensConsulta = await separarItemRepository.consulta(params);
          itensSepararConsulta.push(...separarItensConsulta);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensMutation.map((item) => item.toJson()),
        });

        const basicEventItensSeparacaoConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSeparacaoConsulta.map((item) => item.toJson()),
        });

        const basicEventItensSepararConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itensSepararConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separacao.item.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('separacao.item.delete.listen', JSON.stringify(basicEventItensSeparacaoConsulta.toJson()));
        io.emit('separar.item.update.listen', JSON.stringify(basicEventItensSepararConsulta.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoItemSeparacaoDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemSeparacaoDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
