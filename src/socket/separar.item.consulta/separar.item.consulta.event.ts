import { Socket } from 'socket.io';

import SepararItemConsultaRepository from './separar.item.consulta.repository';

export default class SepararItemConsultaEvent {
  private repository = new SepararItemConsultaRepository();

  constructor(private readonly socket: Socket) {
    socket.on('separar.item.consulta', async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';

      try {
        if (params != '') {
          const result = await this.repository.selectWhere(params);
          const resultJson = result.map((item) => item.toJson());
          socket.emit(resposeIn, JSON.stringify(resultJson));
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
