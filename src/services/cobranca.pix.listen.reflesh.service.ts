import { STATUS } from '../type/status';

import FirebaseCobrancaPixListenRefleshRepository from '../repository/firebase.cobranca.pix.listen.reflesh.repository';
import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';
import SituacaoGnPixService from './situacao.gn.pix.service';
import ListenContract from '../contracts/listen.contract';

export default class CobrancaPixListenRefleshService implements ListenContract {
  private fbCobrancaPixListenRefleshRepository = new FirebaseCobrancaPixListenRefleshRepository();
  private fbCobrancaPixRepository = new FirebaseCobrancaPixRepository();
  private situacaoGnPixService = new SituacaoGnPixService();

  public listen() {
    this.fbCobrancaPixListenRefleshRepository.listen(async (txid: string) => {
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
