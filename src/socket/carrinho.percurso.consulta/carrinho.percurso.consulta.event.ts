import { Socket } from 'socket.io';

import CarrinhoPercursoConsultaRepository from './carrinho.percurso.consulta.repository';

export default class CarrinhoPercursoConsultaEvent {
  private repository = new CarrinhoPercursoConsultaRepository();

  constructor(private readonly socket: Socket) {
    socket.on('carrinho.percurso.consulta', async (data) => {
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
  }
}
