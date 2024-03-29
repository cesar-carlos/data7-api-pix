import { responsePixDetailDto } from '../dto/response.pix.detail.dto';

import GerencianetBase from './gerencianet.base';

export default class GerencianetPixDetailAdapter extends GerencianetBase {
  public async execute(txid: string): Promise<responsePixDetailDto> {
    try {
      const params = txid;
      const response = await this.gerencianet.pixDetailCharge(params);
      const result = response as responsePixDetailDto;
      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
