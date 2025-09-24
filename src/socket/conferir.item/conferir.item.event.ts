import { Server as SocketIOServer, Socket } from 'socket.io';
import { Pagination, OrderBy } from '../../contracts/local.base.params';

import ConferirItemRepository from './conferir.item.repository';
import ExpedicaoItemConferirDto from '../../dto/expedicao/expedicao.item.conferir.dto';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';

export default class ConferirItemEvent {
  private repository = new ConferirItemRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} conferir.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.item.consulta`;
      const params = json['Where'] ?? '';
      const pagination = new Pagination(json['Pagination']);
      const orderBy = new OrderBy(json['OrderBy']);

      try {
        const result = await this.repository.consulta(params, pagination, orderBy);
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

    socket.on(`${client} conferir.item.unidade.medida.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.item.unidade.medida.consulta`;
      const params = json['Where'] ?? '';
      const pagination = new Pagination(json['Pagination']);
      const orderBy = new OrderBy(json['OrderBy']);

      try {
        const result = await this.repository.consultaUnidadeMedida(params, pagination, orderBy);
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

    socket.on(`${client} conferir.separacao.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.separacao.item.consulta`;
      const params = json['Where'] ?? '';
      const pagination = new Pagination(json['Pagination']);
      const orderBy = new OrderBy(json['OrderBy']);

      try {
        const result = await this.repository.consultaConferirSeparacao(params, pagination, orderBy);
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

    socket.on(`${client} conferir.item.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.item.select`;
      const params = json['Where'] ?? '';
      const pagination = new Pagination(json['Pagination']);
      const orderBy = new OrderBy(json['OrderBy']);

      try {
        const result = await this.repository.select(params, pagination, orderBy);
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

    socket.on(`${client} conferir.item.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.item.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        for (const el of itens) {
          await this.repository.insert([el]);

          const inerted = await this.repository.select(`
            CodEmpresa = ${el.CodEmpresa}
              AND CodConferir = ${el.CodConferir}
              AND CodProduto = '${el.CodProduto}'
            ORDER BY Item `);

          try {
            el.Item = inerted[inerted.length - 1].Item;
          } catch (err: any) {
            const basicEventErro = new ExpedicaoBasicErrorEvent({
              Session: session,
              ResponseIn: responseIn,
              Error: [err.message],
            });

            socket.emit(responseIn, JSON.stringify(basicEventErro.toJson()));
          }
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.item.insert.listen', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} conferir.item.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.item.update`;
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
        io.emit('conferir.item.update.listen', JSON.stringify(basicEvent.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} conferir.item.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} conferir.item.delete`;
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
        io.emit('conferir.item.delete.listen', JSON.stringify(basicEvent.toJson()));
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

  private convert(mutations: any[] | any): ExpedicaoItemConferirDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoItemConferirDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
