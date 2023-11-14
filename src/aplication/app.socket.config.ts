import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoEvent from '../socket/carrinho/carrinho.event';
import CarrinhoConsultaEvent from '../socket/carrinho.consulta/carrinho.consulta.event';
import SequenciaRegistroEvent from '../socket/sequencia.registro.consulta/sequencia.registro.event';
import CarrinhoPercursoEstagioEvent from '../socket/carrinho.percurso.estagio/carrinho.percurso.estagio.event';
import CarrinhoPercursoConsultaEvent from '../socket/carrinho.percurso.consulta/carrinho.percurso.consulta.event';
import SeparacaoItemConsultaEvent from '../socket/separacao.item.consulta/separacao.item.consulta.event';
import SepararItemConsultaEvent from '../socket/separar.item.consulta/separar.item.consulta.event';
import CarrinhoPercursoEvent from '../socket/carrinho.percurso/carrinho.percurso.event';
import SeparacaoItemEvent from '../socket/separacao.item/separacao.item.event';
import SepararItemEvent from '../socket/separar.item/separar.item.event';
import SepararEvent from '../socket/separar/separar.event';
import PercursoEstagioEvent from '../socket/percurso.estagio/percurso.estagio.event';

export default class AppSocket {
  constructor(private readonly io: SocketIOServer) {
    this.initialize();
  }

  private initialize() {
    this.io.on('connection', (socket: Socket) => {
      console.log('Cliente conectado');

      new CarrinhoEvent(socket);
      new CarrinhoConsultaEvent(socket);
      new CarrinhoPercursoEstagioEvent(socket);
      new CarrinhoPercursoConsultaEvent(socket);
      new SeparacaoItemConsultaEvent(socket);
      new SepararItemConsultaEvent(socket);
      new SequenciaRegistroEvent(socket);
      new CarrinhoPercursoEvent(socket);
      new SeparacaoItemEvent(socket);
      new SepararItemEvent(socket);
      new SepararEvent(socket);
      new PercursoEstagioEvent(socket);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        socket.removeAllListeners();
      });
    });
  }
}
