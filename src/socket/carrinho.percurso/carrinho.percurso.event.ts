import { Socket } from 'socket.io';

import CarrinhoPercursoRepository from './carrinho.percurso.repository';

export default class CarrinhoPercursoEvent {
  private repository = new CarrinhoPercursoRepository();

  constructor(private readonly socket: Socket) {
    socket.on('carrinho.percurso.select', async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.selectWhere(params);
          socket.emit(resposeIn, JSON.stringify(result));
          return;
        }

        const result = await this.repository.select();
        socket.emit(resposeIn, JSON.stringify(result));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on('carrinho.percurso.update', async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';
      const mutation = json['mutation'];

      try {
        await this.repository.update(mutation);
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on('carrinho.percurso.insert', (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';
      const mutation = json['mutation'];

      try {
        this.repository.insert(mutation);
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });

    socket.on('carrinho.percurso.delete', (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';
      const mutation = json['mutation'];

      try {
        this.repository.delete(mutation);
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
