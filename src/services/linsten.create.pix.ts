import WatchPatch from '../controllers/watch.patch';

import GerencianetCobranca from './gerencianet.cobranca';
import Cobranca from '../entities/cobranca';

import AppError from '../entities/app.error';

import FirebaseCobrancaRepository from '../repository/firebase.cobranca.repository';
import FirebasePagamentoRepository from '../repository/firebase.pagamento.repository';
import FirebaseAppErrorRepository from '../repository/farebase.app.error.repository';
import FarebaseQrcodeRepository from '../repository/farebase.qrcode.repository';
import FerebasePagamentoSituacaoRepository from '../repository/ferebase.pagamento.situacao.repository';

export default class ListenCreatePIX {
  private config = require('../assets/config.pix.ts');
  private gerenciador = new GerencianetCobranca(this.config);
  private repositoryCobranca = new FirebaseCobrancaRepository();
  private repositoryPagamento = new FirebasePagamentoRepository();
  private repositoryQrcode = new FarebaseQrcodeRepository();
  private repositorySituacao = new FerebasePagamentoSituacaoRepository();

  constructor() {
    this.initialize();
  }

  private async initialize() {}

  async exec(patch: string) {
    const _watchPatch = new WatchPatch(patch);
    _watchPatch.listen((cobrancas: Cobranca[], filename: string) => {
      if (cobrancas) this.createOrUpdadeChargePIX(cobrancas);
    });
  }

  private async createOrUpdadeChargePIX(cobrancas: Cobranca[]): Promise<void> {
    for (const cobranca of cobrancas) {
      const codId = cobranca.id;
      const cnpj = cobranca.id.split('.')[2];

      const fbCobranca = await this.repositoryCobranca.getById(codId, cnpj);
      if (!fbCobranca) {
        await this.newChargePIX(cobranca);
      } else {
        await this.updateChargePIX(cobranca);
      }
    }
  }

  private async newChargePIX(cobranca: Cobranca): Promise<boolean> {
    try {
      const codId = cobranca.id;
      const cnpj = cobranca.id.split('.')[2];

      await this.repositoryCobranca.insert(cobranca);
      const newPagamento = await this.gerenciador.createChargePIX(cobranca);

      if (newPagamento && newPagamento?.loc?.id) {
        await this.repositoryPagamento.insert(newPagamento);

        const pagamentoQrCode = await this.gerenciador.createQrCodePIX(codId, newPagamento.loc.id);
        if (pagamentoQrCode) await this.repositoryQrcode.insert(pagamentoQrCode);

        const resposeSituacao = await this.gerenciador.statusPIX(newPagamento.txid);
        if (resposeSituacao) await this.repositorySituacao.insert(resposeSituacao);

        return true;
      }

      return false;
    } catch (error: any) {
      const appError = new AppError('', 'newChargePIX', error.message, '', '');
      await new FirebaseAppErrorRepository().insert(appError);
    }

    return false;
  }

  private async updateChargePIX(cobranca: Cobranca): Promise<boolean> {
    try {
      const codId = cobranca.id;
      const cnpj = cobranca.id.split('.')[2];

      const pagamento = await this.repositoryPagamento.getById(cnpj, codId);
      if (!pagamento) {
        const fbPagamento = await this.newChargePIX(cobranca);
        return true;
      }

      const qrCode = await this.repositoryQrcode.getById(cnpj, codId);
      if (!qrCode) {
        const pagamentoQrCode = await this.gerenciador.createQrCodePIX(codId, pagamento.loc.id);
        if (pagamentoQrCode) await this.repositoryQrcode.insert(pagamentoQrCode);
        const resposeSituacao = await this.gerenciador.statusPIX(pagamento.txid);
        if (resposeSituacao) await this.repositorySituacao.insert(resposeSituacao);
        return true;
      }
    } catch (error: any) {
      const appError = new AppError('', 'updateChargePIX', error.message, '', '');
      await new FirebaseAppErrorRepository().insert(appError);
    }

    return false;
  }
}
