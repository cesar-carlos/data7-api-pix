import { Socket } from 'socket.io';

import CarrinhoRepository from './carrinho.repository';

export default class CarrinhoEvent {
  private repository = new CarrinhoRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;
    const segmento = 'carrinho';

    socket.on(`${client} carrinho.select`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.select`;
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.selectWhere(params);
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

    socket.on(`${client} carrinho.insert`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.insert`;
      const mutation = json['mutation'];

      try {
        this.repository.insert(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.update`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.delete`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.delete`;
      const mutation = json['mutation'];

      try {
        this.repository.delete(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
