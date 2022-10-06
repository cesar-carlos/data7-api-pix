import CobrancaDigitalAdicionaisDto from '../../../src/dto/cobranca.digital.adicionais.dto';
import LocalSqlServerCobrancaDigitalAdicionaisRepository from '../../../src/repository/local.sql.server.cobranca.digital.adicionais.repository';

describe('CRUD (Integracao.CobrancaDigitalAdicionais)', () => {
  const repository = new LocalSqlServerCobrancaDigitalAdicionaisRepository();
  const newEntity = new CobrancaDigitalAdicionaisDto({
    codEmpresa: 999,
    codCobrancaDigital: 1,
    item: '001',
    sequencia: 1,
    adicional: 'Teste',
  });

  const upEntity = new CobrancaDigitalAdicionaisDto({
    codEmpresa: 999,
    codCobrancaDigital: 1,
    item: '001',
    sequencia: 1,
    adicional: 'Teste 2',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCobrancaDigital', value: 1 },
      { key: 'Item', value: '001' },
      { key: 'Sequencia', value: 1 },
    ];

    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].adicional).toBe(newEntity.adicional);
  });

  it('deve atualizar registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCobrancaDigital', value: 1 },
      { key: 'Item', value: '001' },
      { key: 'Sequencia', value: 1 },
    ];

    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].adicional).toBe(upEntity.adicional);
  });

  it('deve deletar registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCobrancaDigital', value: 1 },
      { key: 'Item', value: '001' },
      { key: 'Sequencia', value: 1 },
    ];

    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
