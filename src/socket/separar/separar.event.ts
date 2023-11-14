import { Socket } from 'socket.io';

import SepararRepository from './separar.repository';

export default class SepararEvent {
  private repository = new SepararRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separar.select`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.select`;
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

    socket.on(`${client} separar.insert`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.insert`;
      const mutation = json['mutation'];

      try {
        this.repository.insert(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separar.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.update`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separar.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} separar.delete`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.delete`;
      const mutation = json['mutation'];

      try {
        this.repository.delete(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('separar.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
