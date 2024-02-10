import { Server as SocketIOServer, Socket } from 'socket.io';

import UsuarioDto from '../../dto/common.data/usuario';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import UsuarioConsultaDto from '../../dto/common.data/usuario.consulta.dto';
import UsuarioRepository from './usuario.repository';

export default class UsuarioEvent {
  private repository = new UsuarioRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} usuario.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} usuario.consulta`;
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
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} usuario.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} usuario.select`;
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

    socket.on(`${client} usuario.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} usuario.insert`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodUsuario = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const usuarioConsulta: UsuarioConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodUsuario = ${item.CodUsuario}`);
          usuarioConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventUsuarioConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: usuarioConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('usuario.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('usuario.insert.listen', JSON.stringify(basicEventUsuarioConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} usuario.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} usuario.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const usuarioConsulta: UsuarioConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodUsuario = ${item.CodUsuario}`);
          usuarioConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventUsuaroConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: usuarioConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('usuario.update', JSON.stringify(basicEvent.toJson()));
        io.emit('usuario.update.listen', JSON.stringify(basicEventUsuaroConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} usuario.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} usuario.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);

        const usuarioConsulta: UsuarioConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(` CodUsuario = ${item.CodUsuario}`);
          usuarioConsulta.push(...result);
        }

        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventUsuarioConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: usuarioConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('usuario.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('usuario.delete.listen', JSON.stringify(basicEventUsuarioConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): UsuarioDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return UsuarioDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
