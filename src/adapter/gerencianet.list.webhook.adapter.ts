import { resposeWebhookListDto } from '../dto/respose.webhook.list.dto';
import GerencianetBase from './gerencianet.base';

//todo: add respons dto
export default class GerencianetListWebhook extends GerencianetBase {
  public async execute(startDate: Date, endDate: Date, page: number = 1): Promise<resposeWebhookListDto> {
    try {
      const params = { inicio: startDate.toISOString(), fim: endDate.toISOString() };
      const respose = await this.gerencianet.pixListWebhook(params);

      if (!respose) {
        throw new Error('Não foi possível listar os webhooks');
      }

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
