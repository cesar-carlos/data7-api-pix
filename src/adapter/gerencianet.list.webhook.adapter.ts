import { resposeWebhookDto } from '../dto/respose.webhook.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetListWebhook extends GerencianetBase {
  public async execute(startDate: Date, endDate: Date, page: number = 1): Promise<resposeWebhookDto[]> {
    try {
      const params = { inicio: startDate.toISOString(), fim: endDate.toISOString() };
      const respose = await this.gerencianet.pixListWebhook(params);

      if (!respose) throw new Error('Não foi possível listar os webhooks');
      const resposeWebhookList = respose?.webhooks?.map((item: any) => {
        return {
          webhookUrl: item.webhookUrl,
          chave: item.chave,
          criacao: new Date(item.criacao),
        };
      });

      return resposeWebhookList;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
