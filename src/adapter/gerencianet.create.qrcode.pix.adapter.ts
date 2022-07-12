import ContractCredentialPIX from '../contracts/credential.pix.contract';
import { responseCreateQrcodePix } from '../dto/response.create.qrcode.pix';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreateQrcodePixAdapter extends GerencianetBase {
  constructor(config: ContractCredentialPIX) {
    super(config);
  }

  async execute(locid: number): Promise<responseCreateQrcodePix> {
    try {
      const params = { id: locid };
      const request = await this.gerencianet.pixGenerateQRCode(params);
      const result: responseCreateQrcodePix = {
        qrcode: request.qrcode,
        imagemQrcode: request.imagemQrcode,
      };

      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
