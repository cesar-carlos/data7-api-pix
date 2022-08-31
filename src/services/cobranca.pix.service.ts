import { ProcessInfoStatusType } from '../type/process.info.status.type';
import { STATUS } from '../type/status';

import Cobranca from '../entities/cobranca';
import CobrancaPix from '../entities/cobranca.pix';
import ProcessInfo from '../entities/process.info';
import CreateGnPixService from './create.gn.pix.service';
import CreateGnQrcodeService from './create.gn.qrcode.service';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaLiberacaoKey from '../entities/cobranca.liberacao.key';

export default class CobrancaPixService {
  constructor(readonly repo: ContractBaseRepository<CobrancaPix>) {}
  public async execute(cobranca: Cobranca): Promise<ProcessInfo | CobrancaPix[]> {
    try {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };

      //CREATE COBRANCA PIX
      const createGnPixService = new CreateGnPixService(cobranca.chave);
      const pgtoPendenteOrProcessInfo = await createGnPixService.execute(cobranca);
      if (pgtoPendenteOrProcessInfo instanceof ProcessInfo) {
        return pgtoPendenteOrProcessInfo;
      }

      //CREATE COBRANCA PIX QR CODE
      const processInfoQrcode = [];
      const cobrancaPix: CobrancaPix[] = [];

      const createGnQrcodeService = new CreateGnQrcodeService();
      for (const item of pgtoPendenteOrProcessInfo) {
        const pgtoQrCodeOrProcessInfo = await createGnQrcodeService.execute(item);
        if (pgtoQrCodeOrProcessInfo instanceof ProcessInfo) {
          processInfoQrcode.push(pgtoQrCodeOrProcessInfo);
        } else {
          const cobParcela = cobranca.parcelas.filter((p) => p.sysId === item.sysId).shift();
          if (!cobParcela) return new ProcessInfo(infoStatusErro, 'Parcela não encontrada');

          const cobPix = new CobrancaPix({
            sysId: cobParcela.sysId,
            txId: item.txid,
            locId: item.loc.id,
            STATUS: STATUS.ATIVO,
            datacriacao: item.criacao,
            parcela: cobParcela.numeroParcela,
            valor: cobParcela.valorParcela,
            linkQrCode: pgtoQrCodeOrProcessInfo.qrcode,
            imagemQrcode: pgtoQrCodeOrProcessInfo.imagemQrcode,
            nomeCliente: cobranca.cliente.nomeCliente,
            telefone: cobranca.cliente.telefone || '',
            eMail: cobranca.cliente.eMail || '',
            liberacaoKey: new CobrancaLiberacaoKey({ ...cobParcela.liberacaoKey }),
          });

          this.repo.insert(cobPix);
          cobrancaPix.push(cobPix);
        }
      }

      return cobrancaPix;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CobrancaPixService', error.message);
    }
  }
}
