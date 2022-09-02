import CobrancaDigitalDto from '../../../src/dto/cobranca.digital.dto';
import LocalSqlServerCobrancaDigitalRepository from '../../../src/repository/local.sql.server.cobranca.digital.repository';

describe('CRUD (Integracao.CobrancaDigital)', () => {
  const repository = new LocalSqlServerCobrancaDigitalRepository();
  const newEntity = new CobrancaDigitalDto(
    999,
    1,
    1,
    'OB',
    1,
    'MONTANDO-COBRANCA',
    1,
    'SE7E SISTEMAS',
    '00000000000',
    '00 0 0000 0000',
    'teste@teste.com',
    'AV. ENDEREÇO',
    'SN',
    'COMPL. ENDEREÇO',
    'BAIRRO COBRANÇA',
    '78550 000',
    '000000',
    'SINOP',
    'MT',
    1,
    'ADMINISTRADOR',
    'SERVIDOR',
    '127.0.0.1',
  );

  const upEntity = new CobrancaDigitalDto(
    999,
    1,
    1,
    'OB',
    1,
    'CANCELADO-SISTEMA',
    1,
    'SE7E SISTEMAS',
    '00000000000',
    '00 0 0000 0000',
    'teste@teste.com',
    'AV. ENDEREÇO',
    'SN',
    'COMPL. ENDEREÇO',
    'BAIRRO COBRANÇA',
    '78550 000',
    '000000',
    'SINOP',
    'MT',
    1,
    'ADMINISTRADOR',
    'SERVIDOR',
    '127.0.0.1',
  );

  const params = [
    { key: 'CodEmpresa', value: 999 },
    { key: 'CodFilial', value: 1 },
    { key: 'CodCobrancaDigital', value: 1 },
  ];

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].situacao).toBe(newEntity.situacao);
  });

  it('deve atualizar registro gravado', async () => {
    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].situacao).toBe(upEntity.situacao);
  });

  it('deve deletar registro gravado', async () => {
    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
