import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoPercursoRepository from './carrinho.percurso.repository';
import ExpedicaoCarrinhoPercursoDto from '../../dto/expedicao/expedicao.carrinho.percurso.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';

export default class CarrinhoPercursoEvent {
  private repository = new CarrinhoPercursoRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} carrinho.percurso.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.consulta`;
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

    socket.on(`${client} carrinho.percurso.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.select`;
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

    socket.on(`${client} carrinho.percurso.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.insert`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        const carrinhoPercursos: ExpedicaoCarrinhoPercursoDto[] = [];
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodCarrinhoPercurso = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
          carrinhoPercursos.push(item);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhoPercursos.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.percurso.estagio.insert', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.percurso.estagio.update', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.percurso.estagio.delete', JSON.stringify(basicEvent.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoCarrinhoPercursoDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoCarrinhoPercursoDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
