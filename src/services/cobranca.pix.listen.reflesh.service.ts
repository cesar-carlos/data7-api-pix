import { STATUS } from '../type/status';

import FirebaseCobrancaPixListenRefleshRepository from '../repository/firebase/firebase.cobranca.pix.listen.reflesh.repository';
import FirebaseCobrancaPixRepository from '../repository/firebase/firebase.cobranca.pix.repository';
//import SituacaoGnPixService from './situacao.gn.pix.service';
import ListenContract from '../contracts/listen.contract';

export default class CobrancaPixListenRefleshService implements ListenContract {
  private fbCobrancaPixListenRefleshRepository = new FirebaseCobrancaPixListenRefleshRepository();
  private fbCobrancaPixRepository = new FirebaseCobrancaPixRepository();
  //private situacaoGnPixService = new SituacaoGnPixService();

  public listen() {}
}
