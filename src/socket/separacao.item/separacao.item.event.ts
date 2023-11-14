import { Socket } from 'socket.io';

import SeparacaoItemRepository from './separacao.item.repository';

export default class SeparacaoItemEvent {
  private repository = new SeparacaoItemRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separacao.item.select`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.select`;
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

    socket.on(`${client} separacao.item.insert`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.insert`;
      const mutation = json['mutation'];

      try {
        this.repository.insert(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separacao.item.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separacao.item.update`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separacao.item.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separacao.item.delete`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separacao.item.delete`;
      const mutation = json['mutation'];

      try {
        this.repository.delete(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separacao.item.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
