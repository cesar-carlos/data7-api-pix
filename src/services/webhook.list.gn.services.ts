import GerencianetListWebhookAdapter from '../adapter/gerencianet.list.webhook.adapter';
import { WebhookList } from '../entities/webhook.list';

export default class WebhookListGnServices {
  constructor() {}

  public async execute(): Promise<WebhookList> {
    try {
      //create pagination
      const startDate = new Date('2022-01-01');
      const endDate = new Date('2060-01-31');
      const page = 1;

      const _gerencianetListWebhook = new GerencianetListWebhookAdapter();
      const result = _gerencianetListWebhook.execute(startDate, endDate, page);
      const webhookList: WebhookList = (await result).map((item) => {
        return {
          webhookUrl: item.webhookUrl,
          chave: item.chave,
          criacao: item.criacao,
        };
      });

      return webhookList;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
