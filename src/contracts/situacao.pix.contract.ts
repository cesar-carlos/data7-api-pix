import AppAlert from '../entities/app.alert';
import PagamentoSituacao from '../entities/pagamento.situacao';

export default interface SituacaoPixContract {
  execute(txid: string): Promise<PagamentoSituacao | AppAlert>;
}
