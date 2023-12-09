import { Server as SocketIOServer, Socket } from 'socket.io';

import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import ExpedicaoConferirConsultaDto from '../../dto/expedicao/expedicao.conferir.consulta.dto';
import ExpedicaoConferirDto from '../../dto/expedicao/expedicao.conferir.dto';
import ConferirRepository from './conferir.repository';

export default class ConferirEvent {
  private repository = new ConferirRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} conferir.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferir.consulta`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.consulta(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.select();

        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.conferir.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.conferir.consulta`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.carrinhoConferirConsulta(params);
          const json = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(json));
          return;
        }

        const result = await this.repository.select();

        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferir.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferir.select`;
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
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferir.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferir.insert`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodConferir = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const conferirConsulta: ExpedicaoConferirConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa} AND CodConferir = ${item.CodConferir}`,
          );

          conferirConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConferirConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: conferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferir.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.insert.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      } catch (err: any) {
        socket.emit(resposeIn, JSON.stringify(err.message));
      }
    });

    socket.on(`${client} conferir.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} conferir.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const conferirConsulta: ExpedicaoConferirConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa} AND CodConferir = ${item.CodConferir}`,
          );

          conferirConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConferirConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: conferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferir.update', JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.update.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} conferir.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} Conferir.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);

        const conferirConsulta: ExpedicaoConferirConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(
            ` CodEmpresa = ${item.CodEmpresa} AND CodConferir = ${item.CodConferir}`,
          );

          conferirConsulta.push(...result);
        }

        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventConferirConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: conferirConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('conferir.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('conferir.delete.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoConferirDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoConferirDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
