import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoEvent from '../socket/carrinho/carrinho.event';

import SequenciaRegistroEvent from '../socket/sequencia.registro/sequencia.registro.event';
import CarrinhoPercursoEstagioEvent from '../socket/carrinho.percurso.estagio/carrinho.percurso.estagio.event';
import CarrinhoPercursoEvent from '../socket/carrinho.percurso/carrinho.percurso.event';
import PercursoEstagioEvent from '../socket/percurso.estagio/percurso.estagio.event';
import SeparacaoItemEvent from '../socket/separacao.item/separacao.item.event';
import SepararItemEvent from '../socket/separar.item/separar.item.event';
import SepararEvent from '../socket/separar/separar.event';
import CancelamentoEvent from '../socket/cancelamento/cancelamento.event';

export default class AppSocket {
  constructor(private readonly io: SocketIOServer) {
    this.initialize();
  }

  private initialize() {
    this.io.on('connection', (socket: Socket) => {
      console.log('Cliente conectado');

      new SepararEvent(socket);
      new CarrinhoEvent(socket);
      new CarrinhoPercursoEstagioEvent(socket);
      new SequenciaRegistroEvent(socket);
      new CarrinhoPercursoEvent(socket);
      new SeparacaoItemEvent(socket);
      new SepararItemEvent(socket);
      new CancelamentoEvent(socket);
      new PercursoEstagioEvent(socket);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        socket.removeAllListeners();
      });
    });
  }
}
