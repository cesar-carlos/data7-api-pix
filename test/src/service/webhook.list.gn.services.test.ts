import WebhookListGnServices from '../../../src/services/webhook.list.gn.services';

describe('list webhook registered', () => {
  const webhook = new WebhookListGnServices();

  test('deve retornar chaves para gerar cobrança', async () => {
    const result = await webhook.execute();
    //console.log(result);

    expect(result.length).toBeGreaterThan(0);
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBe([]);
    expect(result.shift()?.chave).not.toBeNull();
  });
});

export default {};
