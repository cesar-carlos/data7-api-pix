import { Server as SocketIOServer, Socket } from 'socket.io';

import SequenciaRegistroRepository from './sequencia.registro.repository';

export default class SequenciaRegistroEvent {
  private repository = new SequenciaRegistroRepository();

  constructor(private readonly io: SocketIOServer, private readonly socket: Socket) {
    const client = socket.id;

    socket.on(`${client} sequencia.consulta`, async (data) => {
      const json = JSON.parse(data);
      const resposeIn = json['resposeIn'] ?? `${client} sequencia.consulta`;
      const params = json['where'] ?? '';

      try {
        const result = await this.repository.select(params);
        if (result === undefined) socket.emit(resposeIn, JSON.stringify([]));
        socket.emit(resposeIn, JSON.stringify([result]));
      } catch (error) {
        socket.emit(resposeIn, JSON.stringify(error));
      }
    });
  }
}
