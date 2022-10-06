import { ProcessInfoStatusType } from '../type/process.info.status.type';

import ProcessInfo from '../entities/process.info';
import GerencianetWebhookDeleteAdapter from '../adapter/gerencianet.webhook.delete.adapter';

export default class WebhookGnDeleteService {
  public async execute(chave: string): Promise<ProcessInfo> {
    try {
      const deleteWebhook = new GerencianetWebhookDeleteAdapter();
      await deleteWebhook.execute(chave);
      const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };
      return new ProcessInfo(infoStatusSuccess, 'WebhookGnDeleteService', 'Webhook deletado com sucesso');
    } catch (error: any) {
      const infoStatus: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatus, 'WebhookGnDeleteService', error.message);
    }
  }
}
