import CobrancaDigitalLogDto from '../../../../src/dto/cobranca.digital.log.dto';
import LocalSqlServerCobrancaDigitalLogRepository from '../../../../src/repository/integracao/local.sql.server.cobranca.digital.log.repository';

describe('CRUD (local.sql.server.logs.repository)', () => {
  const repository = new LocalSqlServerCobrancaDigitalLogRepository();
  const newEntity = new CobrancaDigitalLogDto('d1804d09-4cce-4df2-8889-a7a9be3ab3cd', 'MSG', 'DETAILS');
  const upEntity = new CobrancaDigitalLogDto('d1804d09-4cce-4df2-8889-a7a9be3ab3cd', 'MSG2', 'DETAILS2');

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const params = [{ key: 'ID', value: 'd1804d09-4cce-4df2-8889-a7a9be3ab3cd' }];
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].message).toBe(newEntity.message);
  });

  it('deve atualizar registro gravado', async () => {
    const params = [{ key: 'ID', value: 'd1804d09-4cce-4df2-8889-a7a9be3ab3cd' }];
    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].message).toBe(upEntity.message);
  });

  it('deve deletar registro gravado', async () => {
    const params = [{ key: 'ID', value: 'd1804d09-4cce-4df2-8889-a7a9be3ab3cd' }];
    const result = await repository.delete(newEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
