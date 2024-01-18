import GerencianetBase from './gerencianet.base';
import PagamentoSituacao from '../entities/pagamento.situacao';
import SituacaoPixContract from '../contracts/situacao.pix.contract';
import AppAlert from '../entities/app.alert';

export default class GerencianetPixDetailAdapter extends GerencianetBase implements SituacaoPixContract {
  public async execute(txid: string): Promise<PagamentoSituacao | AppAlert> {
    try {
      const params = { txid };
      const response = await this.gerencianet.pixDetailCharge(params);

      return new AppAlert('alert', 'message', 'details');
    } catch (error: any) {
      return new AppAlert('alert', error.mensagem, error.detalhes);
    }
  }
}
