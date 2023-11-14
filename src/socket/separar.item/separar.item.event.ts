import { Socket } from 'socket.io';

import SepararItemRepository from './separar.item.repository';

export default class SepararItemEvent {
  private repository = new SepararItemRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separar.item.select`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.select`;
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

    socket.on(`${client} separar.item.insert`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.insert`;
      const mutation = json['mutation'];

      try {
        this.repository.insert(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separar.item.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.item.update`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separar.item.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.item.delete`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.delete`;
      const mutation = json['mutation'];

      try {
        this.repository.delete(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separar.item.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
