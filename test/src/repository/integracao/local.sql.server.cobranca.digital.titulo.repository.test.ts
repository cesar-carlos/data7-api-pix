import CobrancaDigitalTituloDto from '../../../../src/dto/cobranca.digital.titulo.dto';
import LocalSqlServerCobrancaDigitalTituloRepository from '../../../../src/repository/integracao/local.sql.server.cobranca.digital.titulo.repository';

describe('CRUD (local.sql.server.cobranca.digital.titulo.repository)', () => {
  const repository = new LocalSqlServerCobrancaDigitalTituloRepository();
  const newEntity = new CobrancaDigitalTituloDto({
    codEmpresa: 999,
    codCobrancaDigital: 1,
    item: '001',
    sysId: '3833582.11.27740308000120.20220831141405-OB.21 001',
    status: 'A',
    tipoCobranca: 'PIX',
    numeroTitulo: '777777',
    parcela: '001',
    qtdParcelas: 1,
    liberacaoKey: '{}',
    dataLancamento: new Date(),
    dataEmissao: new Date(),
    dataVenda: new Date(),
    dataVencimento: new Date(),
    valor: 1,
    observacao: '1',
  });

  const upEntity = new CobrancaDigitalTituloDto({
    codEmpresa: 999,
    codCobrancaDigital: 1,
    item: '001',
    sysId: '3833582.11.27740308000120.20220831141405-OB.21 001',
    status: 'A',
    tipoCobranca: 'PIX',
    numeroTitulo: '777777',
    parcela: '001',
    qtdParcelas: 1,
    liberacaoKey: '{}',
    dataLancamento: new Date(),
    dataEmissao: new Date(),
    dataVenda: new Date(),
    dataVencimento: new Date(),
    valor: 1,
    observacao: '1',
  });

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
    expect(entity?.[0].status).toBe(newEntity.status);
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
    expect(entity?.[0].status).toBe(upEntity.status);
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
