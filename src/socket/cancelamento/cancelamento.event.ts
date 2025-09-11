import { Server as SocketIOServer, Socket } from 'socket.io';

import CancelamentoRepository from './cancelamento.repository';
import ExpedicaoCancelamentoDto from '../../dto/expedicao/expedicao.cancelamento.dto';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';

export default class CancelamentoEvent {
  private repository = new CancelamentoRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} cancelamento.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} cancelamento.select`;
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

    socket.on(`${client} cancelamento.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} cancelamento.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodCancelamento = sequence?.Valor ?? 0;
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

    socket.on(`${client} cancelamento.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} cancelamento.update`;
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

    socket.on(`${client} cancelamento.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} cancelamento.delete`;
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

  private convert(mutations: any[] | any): ExpedicaoCancelamentoDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoCancelamentoDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
