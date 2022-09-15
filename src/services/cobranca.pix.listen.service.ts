import * as Pagamento from '../type/status';
import CobrancaPix from '../entities/cobranca.pix';
import PagamentoPixService from './pagamento.pix.service';
import CancelamentoPixService from './cancelamento.pix.service';
import FirebaseCobrancaPixListenRepository from '../repository/firebase.cobranca.pix.listen.repository';
import LocalSqlServerCobrancaDigitalTituloRepository from '../repository/local.sql.server.cobranca.digital.titulo.repository';
import FirebasePagamentoPixRepository from '../repository/firebase.pagamento.pix.repository';
import LocalSqlServerCobrancaDigitalPagamentoRepository from '../repository/local.sql.server.cobranca.digital.pagamento.repository';
import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';

export default class CobrancaPixListenService {
  private fbCobrancaPixListenRepository = new FirebaseCobrancaPixListenRepository();
  private fbPagamentoPixRepository = new FirebasePagamentoPixRepository();
  private fbCobrancaPixRepository = new FirebaseCobrancaPixRepository();
  private lcSqlServerCobrancaDigitalTituloRepository = new LocalSqlServerCobrancaDigitalTituloRepository();
  private lcSqlServerCobrancaDigitalPagamentoRepository = new LocalSqlServerCobrancaDigitalPagamentoRepository();

  public linten() {
    this.fbCobrancaPixListenRepository.linten(async (cobrancaPix: CobrancaPix) => {
      try {
        if (cobrancaPix.STATUS === Pagamento.STATUS.CONCLUIDO) {
          await new PagamentoPixService(
            this.lcSqlServerCobrancaDigitalPagamentoRepository,
            this.fbPagamentoPixRepository,
          ).execute({ sysId: cobrancaPix.sysId, txId: cobrancaPix.txId });

          //FINALIZAR COBRANCA
          cobrancaPix.STATUS = Pagamento.STATUS.FINALIZADO;
          await this.fbCobrancaPixRepository.update(cobrancaPix);
        }

        if (cobrancaPix.STATUS === Pagamento.STATUS.CANCELADO_CLIENTE) {
          new CancelamentoPixService(
            this.lcSqlServerCobrancaDigitalTituloRepository,
            this.fbCobrancaPixRepository,
          ).execute({ sysId: cobrancaPix.sysId, status: 'CC' });

          //FINALIZAR COBRANCA
          cobrancaPix.STATUS = Pagamento.STATUS.CANCELADO;
          await this.fbCobrancaPixRepository.update(cobrancaPix);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    });
  }
}
