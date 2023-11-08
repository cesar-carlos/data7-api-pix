import { Socket } from 'socket.io';

import CarrinhoConsultaRepository from './carrinho.consulta.repository';

export default class CarrinhoConsultaEvent {
  private repository = new CarrinhoConsultaRepository();

  constructor(private readonly socket: Socket) {
    socket.on('carrinho.consulta', async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';

      console.log('carrinho.consulta', params);

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
