import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoRepository from './carrinho.repository';
import ExpedicaoCarrinhoDto from '../../dto/expedicao/expedicao.carrinho.dto';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import ExpedicaoCarrinhoConsultaDto from '../../dto/expedicao/expedicao.carrinho.consulta.dto';

export default class CarrinhoEvent {
  private repository = new CarrinhoRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} carrinho.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.consulta`;
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

    socket.on(`${client} carrinho.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.select`;
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

    socket.on(`${client} carrinho.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.insert`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        for (const item of itens) {
          const sequence = await this.repository.sequence();
          item.CodCarrinho = sequence?.Valor ?? 0;
          await this.repository.insert([item]);
        }

        const carrinhosConsulta: ExpedicaoCarrinhoConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodCarrinho = ${item.CodCarrinho}`);
          carrinhosConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventCarrinhoConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhosConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.insert.listen', JSON.stringify(basicEventCarrinhoConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.update`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const carrinhosConsulta: ExpedicaoCarrinhoConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodCarrinho = ${item.CodCarrinho}`);
          carrinhosConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventCarrinhoConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhosConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.update', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.update.listen', JSON.stringify(basicEventCarrinhoConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.delete`;
      const mutation = json['mutation'];

      try {
        const itens = this.convert(mutation);
        const carrinhosConsulta: ExpedicaoCarrinhoConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodCarrinho = ${item.CodCarrinho}`);
          carrinhosConsulta.push(...result);
        }

        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventCarrinhoConsulta = new ExpedicaoBasicEventDto({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhosConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.delete.listen', JSON.stringify(basicEventCarrinhoConsulta.toJson()));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }

  private convert(mutations: any[] | any): ExpedicaoCarrinhoDto[] {
    try {
      if (!Array.isArray(mutations)) mutations = [mutations];
      return mutations.map((mutation: any) => {
        return ExpedicaoCarrinhoDto.fromObject(mutation);
      });
    } catch (error) {
      return [];
    }
  }
}
