import LocalSqlServerDatabaseOnline from '../../../src/repository/local.sql.server.database.online';

describe('CRUD (Integracao.CobrancaDigitalAdicionais)', () => {
  it('deve retornar a base de dados online', async () => {
    const repo = new LocalSqlServerDatabaseOnline();
    const data = await repo.getDataBaseInfo();
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
  });
});

export default {};
