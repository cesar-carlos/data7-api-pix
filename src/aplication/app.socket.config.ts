import { Server as SocketIOServer, Socket } from 'socket.io';

import CarrinhoEvent from '../socket/carrinho/carrinho.event';
import CancelamentoEvent from '../socket/cancelamento/cancelamento.event';
import SeparacaoItemEvent from '../socket/separacao.item/separacao.item.event';
import SequenciaRegistroEvent from '../socket/sequencia.registro/sequencia.registro.event';
import CarrinhoPercursoEstagioEvent from '../socket/carrinho.percurso.estagio/carrinho.percurso.estagio.event';
import EstoqueConversaoUnidadeEvent from '../socket/produto.conversao.unidade/estoque.conversao.unidade.event';
import ProcessoExecutavelEvent from '../socket/processo.executavel/processo.executavel.event';
import CarrinhoPercursoEvent from '../socket/carrinho.percurso/carrinho.percurso.event';
import PercursoEstagioEvent from '../socket/expedicao.estagio/expedicao.estagio.event';
import ConferenciaItemEvent from '../socket/conferencia.item/conferencia.item.event';
import ConferirItemEvent from '../socket/conferir.item/conferir.item.event';
import EstoqueProdutoEvent from '../socket/produto/estoque.produto.event';
import SepararItemEvent from '../socket/separar.item/separar.item.event';
import ConferirEvent from '../socket/conferir/conferir.event';
import SepararEvent from '../socket/separar/separar.event';

export default class AppSocket {
  constructor(private readonly io: SocketIOServer) {
    this.initialize();
  }

  private initialize() {
    this.io.on('connection', (socket: Socket) => {
      console.log('Cliente conectado');

      new ProcessoExecutavelEvent(this.io, socket);
      new SepararEvent(this.io, socket);
      new CarrinhoEvent(this.io, socket);
      new CarrinhoPercursoEstagioEvent(this.io, socket);
      new SequenciaRegistroEvent(this.io, socket);
      new CarrinhoPercursoEvent(this.io, socket);
      new SeparacaoItemEvent(this.io, socket);
      new SepararItemEvent(this.io, socket);
      new CancelamentoEvent(this.io, socket);
      new PercursoEstagioEvent(this.io, socket);
      new EstoqueProdutoEvent(this.io, socket);
      new EstoqueConversaoUnidadeEvent(this.io, socket);
      new ConferirEvent(this.io, socket);
      new ConferirItemEvent(this.io, socket);
      new ConferenciaItemEvent(this.io, socket);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        socket.removeAllListeners();
      });
    });
  }
}
