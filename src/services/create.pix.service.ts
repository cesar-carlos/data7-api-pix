import AppError from '../entities/app.error';
import Cobranca from '../entities/cobranca';
import CreatePix from '../entities/create.pix';
import GerencianetCobranca from '../adapter/gerencianet.cobranca.adapter';
import { eStatus } from '../entities/pagamento.situacao';

export default class CreatePixService {
  private config = require('../assets/config.pix.ts');
  private gerenciador = new GerencianetCobranca(this.config);

  constructor(private cobranca: Cobranca) {
    this.initialize();
  }

  private async initialize() {}

  public async execute(): Promise<CreatePix | undefined> {
    const qRcode = await this.newChargePIX(this.cobranca);
    return qRcode;
  }

  private async newChargePIX(cobranca: Cobranca): Promise<CreatePix | undefined> {
    try {
      const sysId = cobranca.id;
      const newPagamento = await this.gerenciador.createChargePIX(cobranca);

      if (!newPagamento || !newPagamento?.loc?.id) {
        throw new AppError('', 'newChargePIX', 'ERRO: CRIAR COBRANCA GERENCIA.NET', '', '');
      }

      const pagamentoQrCode = await this.gerenciador.createQrCodePIX(sysId, newPagamento.loc.id);
      const resposeSituacao = await this.gerenciador.statusPIX(newPagamento.txid);

      if (newPagamento && pagamentoQrCode && resposeSituacao) {
        const _createPix = new CreatePix(eStatus.ATIVA, cobranca, newPagamento, pagamentoQrCode, resposeSituacao);
        return _createPix;
      }
    } catch (error: any) {
      throw new AppError('', 'newChargePIX', error.message, '', '');
    }
  }
}
