import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoEstagioDto from '../../dto/expedicao/expedicao.estagio.dto';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import CarrinhoRepository from './expedicao.estagio.repository';

export default class ExpedicaoEstagioEvent {
  private repository = new CarrinhoRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} expedicao.estagio.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} expedicao.estagio.select`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.select(params);
        const jsonData = result.map((item) => item.toJson());

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResponseIn: responseIn,
          Data: jsonData,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} expedicao.estagio.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} expedicao.estagio.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodPercursoEstagio = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} expedicao.estagio.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} expedicao.estagio.update`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} expedicao.estagio.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} expedicao.estagio.delete`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoEstagioDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoEstagioDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
