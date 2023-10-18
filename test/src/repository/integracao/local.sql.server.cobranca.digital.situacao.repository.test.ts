import CobrancaDigitalSituacaoDto from '../../../../src/dto/cobranca.digital.situacao.dto';
import LocalSqlServerCobrancaDigitalSituacaoRepository from '../../../../src/repository/integracao/local.sql.server.cobranca.digital.situacao.repository';

describe('CRUD (local.sql.server.cobranca.digital.situacao.repository)', () => {
  const repository = new LocalSqlServerCobrancaDigitalSituacaoRepository();
  const newEntity = new CobrancaDigitalSituacaoDto({
    sysId: '3833579.11.27740308000120.20220830180236-OB.21 001',
    sequencia: 1,
    status: 'A',
    txId: '64a229dd849244c6b559546e4b05300b',
    locId: '296',
    chave: '',
  });

  const upEntity = new CobrancaDigitalSituacaoDto({
    sysId: '3833579.11.27740308000120.20220830180236-OB.21 001',
    sequencia: 1,
    status: 'C',
    txId: '64a229dd849244c6b559546e4b05300b',
    locId: '296',
    chave: '',
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
