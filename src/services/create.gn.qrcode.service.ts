import { ProcessInfoStatusType } from '../type/process.info.status.type';

import GerencianetCreateQrcodePixAdapter from '../adapter/gerencianet.create.qrcode.pix.adapter';
import PagamentoPendente from '../entities/pagamento.pendente';
import PagamentoQrCode from '../entities/pagamento.qrcode';
import ProcessInfo from '../entities/process.info';

export default class CreateGnQrcodeService {
  constructor() {}
  public async execute(pgtoPendente: PagamentoPendente): Promise<PagamentoQrCode | ProcessInfo> {
    try {
      const locid = pgtoPendente.loc.id;
      const gnCreateQrcode = new GerencianetCreateQrcodePixAdapter();
      const result = await gnCreateQrcode.execute(locid);

      const sysId = pgtoPendente.sysId;
      const qrCode = result.qrcode;
      const imagemQrcode = result.imagemQrcode;

      const pgtoQrCode = new PagamentoQrCode(sysId, locid, qrCode, imagemQrcode);
      return pgtoQrCode;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
    }
  }
}
