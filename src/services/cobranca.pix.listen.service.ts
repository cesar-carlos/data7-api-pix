import * as Pagamento from '../type/status';
import CobrancaPix from '../entities/cobranca.pix';
import FirebaseCobrancaPixListenRepository from '../repository/firebase.cobranca.pix.listen.repository';
import PagamentoPixService from './pagamento.pix.service';
import CancelamentoPixService from './cancelamento.pix.service';

export default class CobrancaPixListenService {
  private fbCobrancaPixListenRepository = new FirebaseCobrancaPixListenRepository();
  public linten() {
    this.fbCobrancaPixListenRepository.linten(async (cobrancaPix: CobrancaPix) => {
      if (cobrancaPix.STATUS === Pagamento.STATUS.CONCLUIDO) {
        new PagamentoPixService().execute(cobrancaPix);
      }

      if (cobrancaPix.STATUS === Pagamento.STATUS.CANCELADO_CLIENTE) {
        new CancelamentoPixService().execute(cobrancaPix);
      }

      if (cobrancaPix.STATUS === Pagamento.STATUS.CANCELADO) {
        new CancelamentoPixService().execute(cobrancaPix);
      }
    });
  }
}
