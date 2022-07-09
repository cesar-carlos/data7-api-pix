import GerencianetCobranca from '../adapter/gerencianet.cobranca.adapter';
import PagamentoSituacao, { eStatus } from '../entities/pagamento.situacao';

export default class LinstenPeymentPIX {
  private config = require('../assets/config.pix.ts');
  private gerenciador = new GerencianetCobranca(this.config);

  constructor() {
    this.inicialize();
  }

  private inicialize() {}

  //create method loop setInterval
  public open(
    txid: string,
    secondsInteval: number = 5,
    request: number = 10,
    callBack: (pagamentoSituacao: PagamentoSituacao) => void,
  ) {
    let contRequest = 0;
    const minSecondsInteval = 5;
    const maxRequest = 50;
    const interval = minSecondsInteval > secondsInteval ? minSecondsInteval : secondsInteval;
    const requests = maxRequest < request ? maxRequest : request;

    const intevalId = setInterval(async () => {
      const pagamentoSituacao = await this.gerenciador.statusPIX(txid);

      //exit loop if maxRequest is reached or txid not found
      if (contRequest > requests || !pagamentoSituacao) {
        clearInterval(intevalId);
      }

      if (pagamentoSituacao?.status === eStatus.CONCLUIDA) {
        clearInterval(intevalId);
        callBack(pagamentoSituacao);
      }

      contRequest++;
    }, interval * 1000);
  }
}
