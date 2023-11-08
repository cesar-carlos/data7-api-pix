import { Socket } from 'socket.io';

import CarrinhoPercursoEstagioRepository from './carrinho.percurso.estagio.repository';

export default class CarrinhoPercursoEstagioEvent {
  private repository = new CarrinhoPercursoEstagioRepository();

  constructor(private readonly socket: Socket) {
    socket.on('carrinho.percurso.estagio.select', async (data) => {
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

    socket.on('carrinho.percurso.estagio.update', async (data) => {
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

    socket.on('carrinho.percurso.estagio.insert', (data) => {
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

    socket.on('carrinho.percurso.estagio.delete', (data) => {
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
