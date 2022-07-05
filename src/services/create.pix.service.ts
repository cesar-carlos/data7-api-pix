import AppError from '../entities/app.error';
import Cobranca from '../entities/cobranca';
import PagamentoQrCode from '../entities/pagamento.qrcode';
import FirebaseAppErrorRepository from '../repository/farebase.app.error.repository';
import FarebaseQrcodeRepository from '../repository/farebase.qrcode.repository';
import FerebasePagamentoSituacaoRepository from '../repository/ferebase.pagamento.situacao.repository';
import FirebaseCobrancaRepository from '../repository/firebase.cobranca.repository';
import FirebasePagamentoRepository from '../repository/firebase.pagamento.repository';
import GerencianetCobranca from './gerencianet.cobranca';

export default class CreatePixService {
  private config = require('../assets/config.pix.ts');
  private gerenciador = new GerencianetCobranca(this.config);
  private repositoryCobranca = new FirebaseCobrancaRepository();
  private repositoryPagamento = new FirebasePagamentoRepository();
  private repositoryQrcode = new FarebaseQrcodeRepository();
  private repositorySituacao = new FerebasePagamentoSituacaoRepository();

  constructor(private cobranca: Cobranca) {
    this.initialize();
  }

  private async initialize() {}

  public async execute(): Promise<PagamentoQrCode | undefined> {
    const qRcode = await this.newChargePIX(this.cobranca);
    return qRcode;
  }

  private async newChargePIX(cobranca: Cobranca): Promise<PagamentoQrCode | undefined> {
    try {
      const sysId = cobranca.id;

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
    } catch (error: any) {
      console.log(error);
      const appError = new AppError('', 'newChargePIX', error.message, '', '');
      await new FirebaseAppErrorRepository().insert(appError);
    }
  }
}
