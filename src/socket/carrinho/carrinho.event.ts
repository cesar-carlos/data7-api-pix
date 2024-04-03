import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoRepository from './carrinho.repository';
import ExpedicaoCarrinhoDto from '../../dto/expedicao/expedicao.carrinho.dto';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import ExpedicaoCarrinhoConsultaDto from '../../dto/expedicao/expedicao.carrinho.consulta.dto';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';

export default class CarrinhoEvent {
  private repository = new CarrinhoRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} carrinho.consulta`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} carrinho.consulta`;
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

    socket.on(`${client} carrinho.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} carrinho.select`;
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

    socket.on(`${client} carrinho.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} carrinho.insert`;
      const mutation = json['Mutation'];

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

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventCarrinhoConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhosConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.insert', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.insert.listen', JSON.stringify(basicEventCarrinhoConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} carrinho.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} carrinho.update`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        await this.repository.update(itens);

        const carrinhosConsulta: ExpedicaoCarrinhoConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodCarrinho = ${item.CodCarrinho}`);
          carrinhosConsulta.push(...result);
        }

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventCarrinhoConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhosConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.update', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.update.listen', JSON.stringify(basicEventCarrinhoConsulta.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });

    socket.on(`${client} carrinho.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['Session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} carrinho.delete`;
      const mutation = json['Mutation'];

      try {
        const itens = this.convert(mutation);
        const carrinhosConsulta: ExpedicaoCarrinhoConsultaDto[] = [];
        for (const item of itens) {
          const result = await this.repository.consulta(`CodCarrinho = ${item.CodCarrinho}`);
          carrinhosConsulta.push(...result);
        }

        await this.repository.delete(itens);

        const basicEvent = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: itens.map((item) => item.toJson()),
        });

        const basicEventCarrinhoConsulta = new ExpedicaoMutationBasicEvent({
          Session: session,
          ResposeIn: resposeIn,
          Mutation: carrinhosConsulta.map((item) => item.toJson()),
        });

        socket.emit(resposeIn, JSON.stringify(basicEvent.toJson()));
        socket.broadcast.emit('carrinho.delete', JSON.stringify(basicEvent.toJson()));
        io.emit('carrinho.delete.listen', JSON.stringify(basicEventCarrinhoConsulta.toJson()));
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
