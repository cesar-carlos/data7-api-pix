import CobrancaDigitalTituloDto from '../../../src/dto/cobranca.digital.titulo';
import LocalSqlServerCobrancaDigitalTituloRepository from '../../../src/repository/local.sql.server.cobranca.digital.titulo.repository';

describe('CRUD (Integracao.CobrancaDigitalTitulo)', () => {
  const repository = new LocalSqlServerCobrancaDigitalTituloRepository();
  const newEntity = new CobrancaDigitalTituloDto(
    999,
    1,
    '001',
    '3833582.11.27740308000120.20220831141405-OB.21 001',
    'A',
    'PIX',
    '777777',
    '001',
    0,
    '{}',
    new Date('2021-08-31'),
    new Date('2021-08-31'),
    new Date('2021-08-31'),
    new Date('2021-08-31'),
    0.99,
    'OBs..',
  );

  const upEntity = new CobrancaDigitalTituloDto(
    999,
    1,
    '001',
    '3833582.11.27740308000120.20220831141405-OB.21 001',
    'C',
    'PIX',
    '888888',
    '001',
    0,
    '{}',
    new Date('2021-08-31'),
    new Date('2021-08-31'),
    new Date('2021-08-31'),
    new Date('2021-08-31'),
    0.99,
    'OBs..',
  );

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCobrancaDigital', value: 1 },
      { key: 'Item', value: '001' },
    ];

    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].status).toBe('A');
  });

  it('deve atualizar registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCobrancaDigital', value: 1 },
      { key: 'Item', value: '001' },
    ];

    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].status).toBe('C');
  });

  it('deve deletar registro gravado', async () => {
    const params = [
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodCobrancaDigital', value: 1 },
      { key: 'Item', value: '001' },
    ];

    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
