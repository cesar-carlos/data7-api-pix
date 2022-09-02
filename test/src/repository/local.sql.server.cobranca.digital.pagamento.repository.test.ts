import CobrancaDigitalPagamentoDto from '../../../src/dto/cobranca.digital.pagamento.dto';
import LocalSqlServerCobrancaDigitalPagamentoRepository from '../../../src/repository/local.sql.server.cobranca.digital.pagamento.repository';

describe('CRUD (Integracao.CobrancaDigitalPagamento)', () => {
  const repository = new LocalSqlServerCobrancaDigitalPagamentoRepository();
  const newEntity = new CobrancaDigitalPagamentoDto({
    sysId: '3833579.11.27740308000120.20220830180236-OB.21 001',
    sequencia: 1,
    status: 'A',
    dataPagamento: new Date('2021-08-30T18:02:36.000Z'),
    valor: 1.2,
    observacao: '',
  });

  const upEntity = new CobrancaDigitalPagamentoDto({
    sysId: '3833579.11.27740308000120.20220830180236-OB.21 001',
    sequencia: 1,
    status: 'C',
    dataPagamento: new Date('2021-08-30T18:02:36.000Z'),
    valor: 1.5,
    observacao: '',
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const params = [
      { key: 'SysId', value: '3833579.11.27740308000120.20220830180236-OB.21 001' },
      { key: 'Sequencia', value: 1 },
    ];

    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].status).toBe(newEntity.status);
  });

  it('deve atualizar registro gravado', async () => {
    const params = [
      { key: 'SysId', value: '3833579.11.27740308000120.20220830180236-OB.21 001' },
      { key: 'Sequencia', value: 1 },
    ];

    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].status).toBe(upEntity.status);
  });

  it('deve deletar registro gravado', async () => {
    const params = [
      { key: 'SysId', value: '3833579.11.27740308000120.20220830180236-OB.21 001' },
      { key: 'Sequencia', value: 1 },
    ];

    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
