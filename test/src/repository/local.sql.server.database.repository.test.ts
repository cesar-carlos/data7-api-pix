import CobrancaDigitalDataBaseDto from '../../../src/dto/cobranca.digital.data.base.dto';
import LocalSqlServerCobrancaDigitalDataBaseRepository from '../../../src/repository/local.sql.server.cobranca.digital.data.base.repository';

describe('CRUD (Integracao.CobrancaDigitalDataBase)', () => {
  const repository = new LocalSqlServerCobrancaDigitalDataBaseRepository();
  const newEntity = new CobrancaDigitalDataBaseDto(999, 'SQL-SERVER', 'sa', '123abc.', 'localhost', 'MSCar', 1433);
  const upEntity = new CobrancaDigitalDataBaseDto(999, 'SQL-SERVER', 'sa', '123abc.', 'localhost', 'Data7', 1433);
  const params = [{ key: 'CodCobrancaDigitalDataBase', value: 999 }];

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].base).toBe(newEntity.base);
  });

  it('deve atualizar registro gravado', async () => {
    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].base).toBe(upEntity.base);
  });

  it('deve deletar registro gravado', async () => {
    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
