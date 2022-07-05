import Cobranca from '../entities/cobranca';
import PagamentoQrCode from '../entities/pagamento.qrcode';
import FarebaseQrcodeRepository from '../repository/farebase.qrcode.repository';
import FerebasePagamentoSituacaoRepository from '../repository/ferebase.pagamento.situacao.repository';
import FirebaseCobrancaRepository from '../repository/firebase.cobranca.repository';
import FirebasePagamentoRepository from '../repository/firebase.pagamento.repository';
import GerencianetCobranca from './gerencianet.cobranca';
import LinstenPeymentPIX from './linsten.peyment.pix';

export default class CreatePixService {
  private config = require('../assets/config.pix.ts');
  private gerenciador = new GerencianetCobranca(this.config);
  private repositoryCobranca = new FirebaseCobrancaRepository();
  private repositoryPagamento = new FirebasePagamentoRepository();
  private repositoryQrcode = new FarebaseQrcodeRepository();
  private repositorySituacao = new FerebasePagamentoSituacaoRepository();
  private linstenPeymentPIX = new LinstenPeymentPIX();

  constructor(private cobranca: Cobranca) {
    this.initialize();
  }

  private async initialize() {}

  public async execute(): Promise<void> {}

  private async newChargePIX(cobranca: Cobranca): Promise<PagamentoQrCode | undefined> {
    try {
      const sysId = cobranca.id;
      const cnpj = cobranca.id.split('.')[2];

      //inser new charge dababe and initialize paymant
      await this.repositoryCobranca.insert(cobranca);
      const newPagamento = await this.gerenciador.createChargePIX(cobranca);

      if (newPagamento && newPagamento?.loc?.id) {
        await this.repositoryPagamento.insert(newPagamento);

        //create new qrcode
        const pagamentoQrCode = await this.gerenciador.createQrCodePIX(sysId, newPagamento.loc.id);
        if (pagamentoQrCode) await this.repositoryQrcode.insert(pagamentoQrCode);

        //request status payment and insert in database
        const resposeSituacao = await this.gerenciador.statusPIX(newPagamento.txid);
        if (resposeSituacao) await this.repositorySituacao.insert(resposeSituacao);

        return pagamentoQrCode;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
