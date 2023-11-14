import { Socket } from 'socket.io';

import CarrinhoPercursoEstagioRepository from './carrinho.percurso.estagio.repository';

export default class CarrinhoPercursoEstagioEvent {
  private repository = new CarrinhoPercursoEstagioRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} carrinho.percurso.estagio.select`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.select`;
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

    socket.on(`${client} carrinho.percurso.estagio.insert`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.insert`;
      const mutation = json['mutation'];

      try {
        await this.repository.insert(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('broadcast.carrinho.percurso.estagio.insert', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.update`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.update`;
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('carrinho.percurso.estagio.update', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on(`${client} carrinho.percurso.estagio.delete`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.percurso.estagio.delete`;
      const mutation = json['mutation'];

      try {
        await this.repository.delete(mutation);
        socket.emit(resposeIn, JSON.stringify(json));
        socket.broadcast.emit('carrinho.percurso.estagio.delete', JSON.stringify(json));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
