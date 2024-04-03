import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoItemArmazenagemDto from '../../dto/expedicao/expedicao.item.armazenagem.dto';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import ItemArmazenagemRepository from './item.armazenagem.repository';

export default class ItemArmazenagemEvent {
  private repository = new ItemArmazenagemRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} armazenagem.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.item.consulta`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.consulta(params);
        const jsonData = result.map((item) => item.toJson());

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResposeIn: resposeIn,
          Data: jsonData,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} armazenagem.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.item.select`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.select(params);
        const jsonData = result.map((item) => item.toJson());

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResposeIn: resposeIn,
          Data: jsonData,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} armazenagem.item.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.item.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);

        for (const el of itens) {
          await this.repository.insert([el]);
        }

        const newItens = await this.repository.select(`
            CodEmpresa = ${itens.shift()?.CodEmpresa}
              AND CodArmazenagem = ${itens.shift()?.CodArmazenagem} `);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: newItens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('armazenagem.item.insert', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} armazenagem.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.item.update`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('armazenagem.item.update', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} armazenagem.item.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.item.delete`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('armazenagem.item.delete', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoItemArmazenagemDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemArmazenagemDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
