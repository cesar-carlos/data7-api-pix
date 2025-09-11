import { v4 as uuidv4 } from 'uuid';
import { io, Socket } from 'socket.io-client';
import { expect, test, describe, beforeAll } from 'vitest';

import App from '../../../../src/aplication/app';

describe('Teste conferencia de pedidos socket', () => {
  beforeAll(() => async () => {});

  test('Deve consultar as conferencia via socket', async () => {
    const app = new App();
    app.execute();

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const socket: Socket = io('http://localhost:3001');
    await new Promise((resolve) => setTimeout(resolve, 100));

    const event = `${socket.id} conferir.consulta`;
    const responseIn = uuidv4();
    const params = '';

    const send = {
      session: socket.id,
      responseIn: responseIn,
      where: params,
    };

    socket.emit(event, JSON.stringify(send));

    const responsePromise = new Promise((resolve) => {
      socket.on(responseIn, (receiver) => {
        const data = JSON.parse(receiver);
        socket.off(responseIn);
        resolve(data);
      });
    });

    const data = (await responsePromise) as Array<any>;
    expect(data).toBeInstanceOf(Array);
  });
}, 15000);
