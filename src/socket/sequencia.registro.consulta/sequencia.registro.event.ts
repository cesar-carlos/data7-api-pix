import { Socket } from 'socket.io';

import SequenciaRegistroRepository from './sequencia.registro.repository';

export default class SequenciaRegistroEvent {
  private repository = new SequenciaRegistroRepository();

  constructor(private readonly socket: Socket) {
    socket.on('sequencia.consulta', async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'];
      const params = json['where'] ?? '';

      try {
        const result = await this.repository.select(params);
        if (result === undefined) socket.emit(resposeIn, JSON.stringify([]));
        socket.emit(resposeIn, JSON.stringify([result]));
      } catch (error) {
        this.socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}

///SequenceDto
