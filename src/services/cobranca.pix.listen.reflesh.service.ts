import FirebaseCobrancaPixListenRefleshRepository from '../repository/firebase.cobranca.pix.listen.reflesh.repository';
import SituacaoGnPixService from './situacao.gn.pix.service';

import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';
import { STATUS } from '../type/status';

export default class CobrancaPixListenRefleshService {
  private fbCobrancaPixListenRefleshRepository = new FirebaseCobrancaPixListenRefleshRepository();
  private fbCobrancaPixRepository = new FirebaseCobrancaPixRepository();
  private situacaoGnPixService = new SituacaoGnPixService();

  public linten() {
    this.fbCobrancaPixListenRefleshRepository.linten(async (txid: string) => {
      try {
        const pgtoSituacao = await this.situacaoGnPixService.execute(txid);
        if (pgtoSituacao.status === STATUS.CONCLUIDO) {
          const cobrancaPIX = await this.fbCobrancaPixRepository.find(pgtoSituacao.sysId);

          if (cobrancaPIX) {
            cobrancaPIX.STATUS = STATUS.CONCLUIDO;
            await this.fbCobrancaPixRepository.update(cobrancaPIX);
          }
        }
      } catch (error) {}
    });
  }
}
