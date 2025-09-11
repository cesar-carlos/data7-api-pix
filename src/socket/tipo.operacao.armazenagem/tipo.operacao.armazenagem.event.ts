import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoTipoOperacaoArmazenagemDto from '../../dto/expedicao/expedicao.tipo.operacao.armazenagem.dto';
import TipoOperacaoArmazenagemRepository from './tipo.operacao.armazenagem.repository';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';

export default class TipoOperacaoArmazenagemEvent {
  private repository = new TipoOperacaoArmazenagemRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} tipo.operacao.armazenagem.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} tipo.operacao.armazenagem.select`;
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

    socket.on(`${client} tipo.operacao.armazenagem.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} tipo.operacao.armazenagem.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodTipoOperacaoArmazenagem = sequence?.Valor ?? 0;
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

    socket.on(`${client} tipo.operacao.armazenagem.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} tipo.operacao.armazenagem.update`;
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

    socket.on(`${client} tipo.operacao.armazenagem.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} tipo.operacao.armazenagem.delete`;
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

  private convert(mutations: any[] | any): ExpedicaoTipoOperacaoArmazenagemDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoTipoOperacaoArmazenagemDto.fromObject(mutation);
      });
    } catch (error: any) {
      return [];
    }
  }
}
