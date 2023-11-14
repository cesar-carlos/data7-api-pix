import { Socket } from 'socket.io';

import CarrinhoRepository from './percurso.estagio.repository';

export default class PercursoEstagioEvent {
  private repository = new CarrinhoRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} percurso.estagio.select`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.select`;
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

    socket.on(`${client} percurso.estagio.insert`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.insert`;
      const mutation = json['mutation'];

      try {
        this.repository.insert(mutation);
        socket.emit(resposeIn, JSON.stringify(data));
        socket.broadcast.emit('percurso.estagio.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} percurso.estagio.update`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
        socket.emit(resposeIn, JSON.stringify(data));
        socket.broadcast.emit('percurso.estagio.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} percurso.estagio.delete`, (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} percurso.estagio.delete`;
      const mutation = json['mutation'];

      try {
        this.repository.delete(mutation);
        socket.emit(resposeIn, JSON.stringify(data));
        socket.broadcast.emit('percurso.estagio.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
