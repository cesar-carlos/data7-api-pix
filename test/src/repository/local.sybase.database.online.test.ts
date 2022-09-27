import LocalSybaseDatabaseOnlineRepository from '../../../src/repository/local.sybase.database.online.repository';

describe('CRUD (Integracao.CobrancaDigitalAdicionais)', () => {
  it('deve retornar a base de dados online', async () => {
    const repo = new LocalSybaseDatabaseOnlineRepository();
    const data = await repo.getDataBaseInfo();
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
  });
});

export default {};
