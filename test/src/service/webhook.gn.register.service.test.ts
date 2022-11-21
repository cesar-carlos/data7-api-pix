require('dotenv').config();

import { env } from 'process';
import { ProcessInfoStatusType } from '../../../src/type/process.info.status.type';

import ChaveService from '../../../src/services/chave.service';
import WebhookListGnServices from '../../../src/services/webhook.list.gn.services';
import WebhookGnDeleteService from '../../../src/services/webhook.gn.delete.service';
import WebhookGnRegisterService from '../../../src/services/webhook.gn.register.service';
import LocalStorageChaveRepository from '../../../src/repository/local.storage.chave.repository';

describe('registra webhook registered', () => {
  const localStorageChaveRepository = new LocalStorageChaveRepository();
  const chaveService = new ChaveService(localStorageChaveRepository);

  const webhookGnDeleteService = new WebhookGnDeleteService();
  const webhookGnRegisterService = new WebhookGnRegisterService();
  const webhookListGnServices = new WebhookListGnServices();

  const infoStatusSuccess: ProcessInfoStatusType = { status: 'success' };

  beforeEach(async () => {});

  test('deve registra webhook', async () => {
    const url = env.WEBHOOK_GN_URL;
    const chaves = await chaveService.execute();
    const chaveProd = chaves.find((item) => item.status === 'producao');
    if (chaveProd && url) {
      const respose = await webhookGnRegisterService.execute(chaveProd.chave, new URL(url));
      expect(respose.process.status).toBe(infoStatusSuccess.status);
    }
  });
});

export default {};
