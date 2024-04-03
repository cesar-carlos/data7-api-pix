import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoArmazenagemDto from '../../dto/expedicao/expedicao.armazenagem.dto';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ArmazenagemRepository from './armazenagem.repository';

export default class ArmazenagemEvent {
  private repository = new ArmazenagemRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} armazenagem.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.select`;
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

    socket.on(`${client} armazenagem.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodArmazenagem = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('armazenagem.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('armazenagem.insert.listen', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} armazenagem.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} .armazenagem.update`;
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
        socket.broadcast.emit('armazenagem.update', JSON.stringify(basicEvent.toJson()));
        io.emit('armazenagem.update.listen', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} armazenagem.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} armazenagem.delete`;
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
        socket.broadcast.emit('armazenagem.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('armazenagem.delete.listen', JSON.stringify(basicEvent.toJson()));
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

  private convert(mutations: any[] | any): ExpedicaoArmazenagemDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoArmazenagemDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
