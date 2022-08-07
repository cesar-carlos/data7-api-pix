import CobrancaPix from '../entities/cobranca.pix';
import FirebaseCobrancaPixListenRepository from '../repository/firebase.cobranca.pix.listen.repository';

export default class CobrancaPixListenService {
  private fbCobrancaPixListenRepository = new FirebaseCobrancaPixListenRepository();

  public linten() {
    this.fbCobrancaPixListenRepository.linten((cobrancaPix: CobrancaPix) => {
      //console.log(cobrancaPix);
    });
  }
}
