import WebhookGnDeleteService from '../../../src/services/webhook.gn.delete.service';
import WebhookGnRegisterService from '../../../src/services/webhook.gn.register.service';
import WebhookListGnServices from '../../../src/services/webhook.list.gn.services';

describe('delete webhook registered', () => {
  const webhookGnDeleteService = new WebhookGnDeleteService();
  const webhookGnRegisterService = new WebhookGnRegisterService();
  const webhookListGnServices = new WebhookListGnServices();

  test('deve deletar webhook', async () => {
    const hooks = await webhookListGnServices.execute();
    const del = hooks.shift();

    if (del) {
      const result = await webhookGnDeleteService.execute(del.chave);
      expect(result.process.status).toBe('success');
    }
  });
});

export default {};
