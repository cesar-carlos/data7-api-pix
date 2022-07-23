import ChaveDto from '../dto/chave.dto';
import GerencianetBase from './gerencianet.base';

//todo: add respons dto
export default class GerencianetConfigWebhook extends GerencianetBase {
  public async execute(chave: string, webhookUrl: URL): Promise<any> {
    try {
      const body = { webhookUrl: webhookUrl.href };
      const params = { chave: chave };
      const respose = await this.gerencianet.pixConfigWebhook(params, body);
      return respose;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
