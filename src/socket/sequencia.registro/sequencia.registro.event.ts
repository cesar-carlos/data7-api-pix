import { Server as SocketIOServer, Socket } from 'socket.io';

import SequenciaRegistroRepository from './sequencia.registro.repository';
import ExpedicaoBasicSelectEvent from '../../model/expedicao.basic.query.event';
import ExpedicaoBasicErrorEvent from '../../model/expedicao.basic.error.event';

export default class SequenciaRegistroEvent {
  private repository = new SequenciaRegistroRepository();

  constructor(
    private readonly io: SocketIOServer,
    private readonly socket: Socket,
  ) {
    const client = socket.id;

    socket.on(`${client} sequencia.select`, async (data) => {
      const json = JSON.parse(data);
      const session = json['session'] ?? '';
      const resposeIn = json['ResposeIn'] ?? `${client} sequencia.select`;
      const params = json['Where'] ?? '';

      try {
        const result = await this.repository.select(params);
        if (result === undefined) throw new Error('Sequencia não encontrada');
        const jsonData = result.toJson();

        const event = new ExpedicaoBasicSelectEvent({
          Session: session,
          ResposeIn: resposeIn,
          Data: jsonData,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      } catch (error: any) {
        const event = new ExpedicaoBasicErrorEvent({
          Session: session,
          ResposeIn: resposeIn,
          Error: error.message,
        });

        socket.emit(resposeIn, JSON.stringify(event.toJson()));
      }
    });
  }
}
