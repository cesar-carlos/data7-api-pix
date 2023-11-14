import { Socket } from 'socket.io';

import SepararItemConsultaRepository from './separar.item.consulta.repository';

export default class SepararItemConsultaEvent {
  private repository = new SepararItemConsultaRepository();

  constructor(private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} separar.item.consulta`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} separar.item.consulta`;
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
