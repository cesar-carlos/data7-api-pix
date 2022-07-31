import GerencianetCreateQrcodePixAdapter from '../adapter/gerencianet.create.qrcode.pix.adapter';
import { responseCreatePixDto } from '../dto/response.create.pix.dto';
import PagamentoPendente from '../entities/pagamento.pendente';
import PagamentoQrCode from '../entities/pagamento.qrcode';
import ProcessInfo from '../entities/process.info';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class CreateGnQrcodeService {
  constructor() {}
  public async execute(pagamentoPendente: PagamentoPendente): Promise<PagamentoQrCode | ProcessInfo> {
    try {
      const locid = pagamentoPendente.loc.id;
      const _gerencianetCreateQrcode = new GerencianetCreateQrcodePixAdapter();
      const result = await _gerencianetCreateQrcode.execute(locid);

      const sysId = pagamentoPendente.adicionais!.shift()!.valor;
      const qrCode = result.qrcode;
      const imagemQrcode = result.imagemQrcode;

      const _pagamentoQrCode = new PagamentoQrCode(sysId, locid, qrCode, imagemQrcode);
      return _pagamentoQrCode;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
    }
  }
}
