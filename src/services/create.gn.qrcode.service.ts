import GerencianetCreateQrcodePixAdapter from '../adapter/gerencianet.create.qrcode.pix.adapter';
import { responseCreatePixDto } from '../dto/response.create.pix.dto';
import PagamentoQrCode from '../entities/pagamento.qrcode';

export default class CreateGnQrcodeService {
  constructor(private responseCreatePix: responseCreatePixDto) {}
  public async execute(): Promise<PagamentoQrCode> {
    try {
      const locid = this.responseCreatePix.loc.id;
      const _gerencianetCreateQrcode = new GerencianetCreateQrcodePixAdapter();
      const result = await _gerencianetCreateQrcode.execute(locid);

      const sysId = this.responseCreatePix.infoAdicionais.shift()!.valor;
      const qrCode = result.qrcode;
      const imagemQrcode = result.imagemQrcode;

      const _pagamentoQrCode = new PagamentoQrCode(sysId, locid, qrCode, imagemQrcode);
      return _pagamentoQrCode;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
