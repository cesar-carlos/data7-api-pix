import ChaveDto from '../dto/chave.dto';
import GerencianetBase from './gerencianet.base';

//todo: add respons dto
export default class GerencianetConfigWebhook extends GerencianetBase {
  public async execute(startDate: Date, endDate: Date, page: number = 1): Promise<any> {
    try {
      const params = { inicio: startDate, fim: endDate };
      const respose = await this.gerencianet.pixListWebhook(params);
      return respose;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
