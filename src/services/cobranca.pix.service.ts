import { ProcessInfoStatusType } from '../type/process.info.status.type';
import { STATUS } from '../type/status';

import Cobranca from '../entities/cobranca';
import CobrancaPix from '../entities/cobranca.pix';
import ProcessInfo from '../entities/process.info';
import CreateGnPixService from './create.gn.pix.service';
import CreateGnQrcodeService from './create.gn.qrcode.service';
import ContractBaseRepository from '../contracts/base.repository.contract';

export default class CobrancaPixService {
  constructor(readonly repo: ContractBaseRepository<CobrancaPix>) {}
  public async execute(cobranca: Cobranca): Promise<ProcessInfo | CobrancaPix> {
    try {
      const qtdParcelas = cobranca.parcelas.length;
      if (!qtdParcelas || qtdParcelas > 1) {
        //TODO: implementar mais de uma parcela
        //CRIAR UM FOR AQUI
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(
          infoStatusErro,
          'CobrancaPixService',
          'Quantidade de parcela superior a uma. Processo de cobrança não suportado',
        );
      }

      const cobrancaPIX = new CreateGnPixService(cobranca.chave);
      const cobrancaPixOrProcessInfo = await cobrancaPIX.execute(cobranca);
      if (cobrancaPixOrProcessInfo instanceof ProcessInfo) {
        return cobrancaPixOrProcessInfo;
      }

      const createGnQrcodeService = new CreateGnQrcodeService();
      const qrCodePixOrProcessInfo = await createGnQrcodeService.execute(cobrancaPixOrProcessInfo);
      if (qrCodePixOrProcessInfo instanceof ProcessInfo) {
        return qrCodePixOrProcessInfo;
      }

      const pgtoPendente = cobrancaPixOrProcessInfo;
      const pgtoPendenteQrCode = qrCodePixOrProcessInfo;
      const parcela = cobranca.parcelas.shift()?.numeroParcela || '001';
      const cobrancaPix = new CobrancaPix(
        pgtoPendente.sysId,
        pgtoPendente.txid,
        pgtoPendente.loc.id,
        STATUS.ATIVO,
        pgtoPendente.criacao,
        parcela,
        pgtoPendente.valor,
        cobranca.filial.cnpj,
        pgtoPendenteQrCode.qrcode,
        pgtoPendenteQrCode.imagemQrcode,
        cobranca.usuario.nomeUsuario,
        cobranca.usuario.estacaoTrabalho,
        cobranca.usuario.ip,
        cobranca.cliente.nomeCliente,
        cobranca.cliente.telefone,
        cobranca.cliente.eMail,
      );

      this.repo.insert(cobrancaPix);
      return cobrancaPix;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CobrancaPixService', error.message);
    }
  }
}
