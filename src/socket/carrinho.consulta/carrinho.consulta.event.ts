import { Socket } from 'socket.io';

import CarrinhoConsultaRepository from './carrinho.consulta.repository';

export default class CarrinhoConsultaEvent {
  private repository = new CarrinhoConsultaRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} carrinho.consulta`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} carrinho.consulta`;
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
  }
}
