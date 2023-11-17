import { Socket } from 'socket.io';

import CarrinhoRepository from './carrinho.repository';
import ExpedicaoCarrinhoDto from '../../dto/expedicao/expedicao.carrinho.dto';

export default class CarrinhoEvent {
  private repository = new CarrinhoRepository();

  constructor(private readonly socket: Socket) {
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

        const result = await this.repository.select();
        const json = result.map((item) => item.toJson());
        socket.emit(resposeIn, JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
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
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.insert`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.insert`;
      const mutation = json['mutation'];

      try {
        await this.repository.insert(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.update`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.delete`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.delete`;
      const mutation = json['mutation'];

      try {
        await this.repository.delete(this.convert(mutation));
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
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
