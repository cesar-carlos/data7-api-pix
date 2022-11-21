import ChaveGnCobrancaService from '../../../src/services/chave.gn.cobranca.service';

//create describe test
describe('? (ChaveGnCobrancaService)', () => {
  const chaveGnCobrancaService = new ChaveGnCobrancaService();

  test('deve retornar chaves para gerar cobrança', async () => {
    const result = await chaveGnCobrancaService.execute();
    //console.log(result);

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(result).not.toBe([]);
    expect(result.shift()?.chave).not.toBeNull();
    expect(result.shift()?.chave).not.toBeUndefined();
  });
});

export default {};
