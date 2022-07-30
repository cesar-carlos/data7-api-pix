import { responsePixStatusDto } from '../dto/response.pix.status.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetPixStatusAdapter extends GerencianetBase {
  public async execute(endToEndId: string): Promise<responsePixStatusDto> {
    try {
      const params = { e2eId: endToEndId };
      const response = await this.gerencianet.pixDetail(params);
      const result = response as responsePixStatusDto;
      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
