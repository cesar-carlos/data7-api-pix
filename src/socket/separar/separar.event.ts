import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoSepararConsultaDto from '../../dto/expedicao/expedicao.separar.consulta.dto';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import SepararRepository from './separar.repository';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';

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
      const resposeIn = json['ResposeIn'] ?? `${client} separar.consulta`;
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

    socket.on(`${client} separar.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} separar.select`;
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

    socket.on(`${client} separar.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} separar.insert`;
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
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventSepararConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: separarConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('separar.insert.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} separar.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} separar.update`;
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
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventSepararConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: separarConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.update', JSON.stringify(basicEvent.toJson()));
        io.emit('separar.update.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} separar.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} separar.delete`;
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
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventSepararConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: separarConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('separar.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('separar.delete.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
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
