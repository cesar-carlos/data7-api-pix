import { Server as SocketIOServer, Socket } from 'socket.io';

import SepararItemRepository from './separar.item.repository';
import ExpedicaoItemSepararDto from '../../dto/expedicao/expedicao.item.separar.dto';
import ExpedicaoBasicErrorEventDto from '../../dto/expedicao/expedicao.basic.error.event.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';

export default class SepararItemEvent {
  private repository = new SepararItemRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} separar.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.consulta`;
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

    socket.on(`${client} separar.item.unidade.medida.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.unidade.medida.consulta`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.consultaUnidadeMedida(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.consultaUnidadeMedida();
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

    socket.on(`${client} separar.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.select`;
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

    socket.on(`${client} separar.item.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.insert`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const el of itens) {
          await this.repository.insert([el]);

          const inerted = await this.repository.select(`
            CodEmpresa = ${el.CodEmpresa}
              AND CodSepararEstoque = ${el.CodSepararEstoque}
              AND CodProduto = '${el.CodProduto}'
            ORDER BY Item `);

          try {
            el.Item = inerted[inerted.length - 1].Item;
          } catch (error: any) {
            throw new Error('Erro ao inserir ' + error.message);
          }
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.item.insert', JSON.stringify(basicEvent.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} separar.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.item.update', JSON.stringify(basicEvent.toJson()));
      } catch (err: any) {
        const basicEventErro = new ExpedicaoBasicErrorEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Error: [err.message],
        });

        socket.emit(resposeIn, JSON.stringify(basicEventErro.toJson()));
      }
    });

    socket.on(`${client} separar.item.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.item.delete', JSON.stringify(basicEvent.toJson()));
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

  private convert(mutations: any[] | any): ExpedicaoItemSepararDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemSepararDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
