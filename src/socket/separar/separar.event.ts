import { Server as SocketIOServer, Socket } from 'socket.io';
import { Pagination, OrderBy } from '../../contracts/local.base.params';

import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoSepararConsultaDto from '../../dto/expedicao/expedicao.separar.consulta.dto';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import SepararRepository from './separar.repository';

export default class SepararEvent {
  private repository = new SepararRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} separar.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} separar.consulta`;
      const params = json['Where'] ?? '';
      const pagination = new Pagination(json['Pagination']);
      const orderBy = new OrderBy(json['OrderBy']);

      try {
        const result: ExpedicaoSepararConsultaDto[] = await this.repository.consulta(params, pagination, orderBy);
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

    socket.on(`${client} separar.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} separar.select`;
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

    socket.on(`${client} separar.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} separar.insert`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodSepararEstoque = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const separarConsulta: ExpedicaoSepararConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa}
            AND CodSepararEstoque = ${item.CodSepararEstoque} `,
          );

          separarConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventSepararConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: separarConsulta.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
        io.emit('separar.insert.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} separar.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} separar.update`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const separarConsulta: ExpedicaoSepararConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa}
            AND CodSepararEstoque = ${item.CodSepararEstoque} `,
          );

          separarConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventSepararConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: separarConsulta.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
        io.emit('separar.update.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResponseIn: responseIn,
          Error: error.message,
        });

        socket.emit(responseIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} separar.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const responseIn = json['ResponseIn'] ?? `${client} separar.delete`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);

        const separarConsulta: ExpedicaoSepararConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa}
            AND CodSepararEstoque = ${item.CodSepararEstoque}`,
          );

          separarConsulta.push(...result);
        }

        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventSepararConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResponseIn: responseIn,
          Mutation: separarConsulta.map((item) => item.toJson()),
        });

        socket.emit(responseIn, JSON.stringify(basicEvent.toJson()));
        io.emit('separar.delete.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
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

  private convert(mutations: any[] | any): ExpedicaoSepararDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoSepararDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
