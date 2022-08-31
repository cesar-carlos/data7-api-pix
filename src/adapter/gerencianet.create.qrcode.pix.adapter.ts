import { responseCreateQrcodePixDto } from '../dto/response.create.qrcode.pix.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreateQrcodePixAdapter extends GerencianetBase {
  async execute(locid: number): Promise<responseCreateQrcodePixDto> {
    try {
      const params = { id: locid };
      const respose = await this.gerencianet.pixGenerateQRCode(params);

      const result: responseCreateQrcodePixDto = {
        qrcode: respose.qrcode,
        imagemQrcode: respose.imagemQrcode,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
