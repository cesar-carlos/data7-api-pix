import { Webhook } from '../entities/webhook';

import GerencianetListWebhookAdapter from '../adapter/gerencianet.list.webhook.adapter';

export default class WebhookListGnServices {
  constructor() {}

  public async execute(): Promise<Webhook[]> {
    try {
      const startDate = new Date('2000-01-01');
      const endDate = new Date('2090-01-31');
      const page = 1;

      const gerencianetListWebhook = new GerencianetListWebhookAdapter();
      const result = await gerencianetListWebhook.execute(startDate, endDate, page);
      const webhookList: Webhook[] = result.map((item) => {
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
