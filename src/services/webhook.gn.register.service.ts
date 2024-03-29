import { ProcessInfoStatusType } from '../type/process.info.status.type';

import ProcessInfo from '../entities/process.info';
import GerencianetWebhookRegisterAdapter from '../adapter/gerencianet.webhook.register.adapter';

export default class WebhookGnRegisterService {
  public async execute(chave: string, url: URL): Promise<ProcessInfo> {
    try {
      const _registerWebhook = new GerencianetWebhookRegisterAdapter();
      await _registerWebhook.execute(chave, url);
      const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };
      return new ProcessInfo(infoStatusSuccess, 'WebhookGnConfigService', 'Webhook registrado com sucesso');
    } catch (error: any) {
      const infoStatus: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatus, 'WebhookGnConfigService', error.message);
    }
  }
}
