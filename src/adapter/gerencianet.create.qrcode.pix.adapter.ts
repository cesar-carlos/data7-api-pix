import { responseCreateQrcodePixDto } from '../dto/api.responses/response.create.qrcode.pix.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreateQrcodePixAdapter extends GerencianetBase {
  async execute(locid: number): Promise<responseCreateQrcodePixDto> {
    try {
      const params = { id: locid };
      const resp = await this.gerencianet.pixGenerateQRCode(params);

      const result: responseCreateQrcodePixDto = {
        qrcode: resp.qrcode,
        imagemQrcode: resp.imagemQrcode,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
