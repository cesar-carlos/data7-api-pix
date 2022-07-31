import ChaveDto from '../dto/chave.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetRegisterWebhookAdapter extends GerencianetBase {
  public async execute(chave: string, webhookUrl: URL): Promise<any> {
    try {
      const params = { chave };
      const body = { webhookUrl };
      const respose = await this.gerencianet.pixConfigWebhook(params, body);
      return respose;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
