import { Server as SocketIOServer, Socket } from 'socket.io';

import UsuarioEvent from '../socket/usuario/usuario.event';
import CarrinhoEvent from '../socket/carrinho/carrinho.event';
import ArmazenarEvent from '../socket/armazenar/armazenar.event';
import CancelamentoEvent from '../socket/cancelamento/cancelamento.event';
import SeparacaoItemEvent from '../socket/separacao.item/separacao.item.event';
import SequenciaRegistroEvent from '../socket/sequencia.registro/sequencia.registro.event';
import CarrinhoPercursoEstagioEvent from '../socket/carrinho.percurso.estagio/carrinho.percurso.estagio.event';
import TipoOperacaoArmazenagemEvent from '../socket/tipo.operacao.armazenagem/tipo.operacao.armazenagem.event';
import CarrinhoPercursoAgrupamentoEvent from '../socket/carrinho.percurso.agrupamento/carrinho.percurso.agrupamento.event';
import EstoqueConversaoUnidadeEvent from '../socket/produto.conversao.unidade/estoque.conversao.unidade.event';
import TipoOperacaoExpedicaoEvent from '../socket/tipo.operacao.expedicao/tipo.operacao.expedicao.event';
import ProcessoExecutavelEvent from '../socket/processo.executavel/processo.executavel.event';
import CarrinhoPercursoEvent from '../socket/carrinho.percurso/carrinho.percurso.event';
import PercursoEstagioEvent from '../socket/expedicao.estagio/expedicao.estagio.event';
import ConferenciaItemEvent from '../socket/conferencia.item/conferencia.item.event';
import ItemArmazenarEvent from '../socket/item.armazenar/item.armazenar.event';
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

      new UsuarioEvent(this.io, socket);
      new SepararEvent(this.io, socket);
      new CarrinhoEvent(this.io, socket);
      new ProcessoExecutavelEvent(this.io, socket);
      new CarrinhoPercursoEstagioEvent(this.io, socket);
      new SequenciaRegistroEvent(this.io, socket);
      new CarrinhoPercursoEvent(this.io, socket);
      new SeparacaoItemEvent(this.io, socket);
      new SepararItemEvent(this.io, socket);
      new CancelamentoEvent(this.io, socket);
      new PercursoEstagioEvent(this.io, socket);
      new EstoqueProdutoEvent(this.io, socket);

      new ConferirEvent(this.io, socket);
      new ConferirItemEvent(this.io, socket);
      new ConferenciaItemEvent(this.io, socket);
      new EstoqueConversaoUnidadeEvent(this.io, socket);
      new CarrinhoPercursoAgrupamentoEvent(this.io, socket);
      new TipoOperacaoArmazenagemEvent(this.io, socket);
      new TipoOperacaoExpedicaoEvent(this.io, socket);
      new ItemArmazenarEvent(this.io, socket);
      new ArmazenarEvent(this.io, socket);

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        socket.removeAllListeners();
      });
    });
  }
}
