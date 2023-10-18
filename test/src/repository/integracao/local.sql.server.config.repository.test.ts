import CobrancaDigitalConfigDto from '../../../../src/dto/cobranca.digital.config.dto';
import LocalSqlServerCobrancaDigitalConfigRepository from '../../../../src/repository/integracao/local.sql.server.cobranca.digital.config.repository';

describe('CRUD (local.sql.server.config.repository', () => {
  const repository = new LocalSqlServerCobrancaDigitalConfigRepository();
  const newEntity = new CobrancaDigitalConfigDto(999, 1, 'S', 'GNET', 'clientId,', 'clientSecret', 'certificado');
  const upEntity = new CobrancaDigitalConfigDto(999, 1, 'N', 'GNET', 'clientId,', 'clientSecret', 'certificado');

  const params = [
    { key: 'CodEmpresa', value: 999 },
    { key: 'CodConfiguracao', value: 1 },
  ];

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].ativo).toBe(newEntity.ativo);
  });

  it('deve atualizar registro gravado', async () => {
    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].ativo).toBe(upEntity.ativo);
  });

  it('deve deletar registro gravado', async () => {
    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
