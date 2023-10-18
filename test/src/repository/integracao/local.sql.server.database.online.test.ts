import LocalSqlServerDatabaseOnlineRepository from '../../../../src/repository/integracao/local.sql.server.database.online.repository';

describe('CRUD (local.sql.server.database.online)', () => {
  it('deve retornar a base de dados online', async () => {
    const repo = new LocalSqlServerDatabaseOnlineRepository();
    const data = await repo.getDataBaseInfo();
    expect(data).not.toBeNull();
    expect(data).not.toBeUndefined();
  });
});

export default {};
