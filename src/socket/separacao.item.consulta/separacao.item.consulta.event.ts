import { Socket } from 'socket.io';

import SeparacaoItemConsultaRepository from './separacao.item.consulta.repository';

export default class SeparacaoItemConsultaEvent {
  private repository = new SeparacaoItemConsultaRepository();

  constructor(private readonly socket: Socket) {
    socket.on('separacao.item.consulta', async (data) => {
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
