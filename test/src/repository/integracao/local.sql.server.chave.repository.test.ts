import ChaveDto from '../../../../src/dto/chave.dto';
import LocalSqlServerCobrancaDigitalChaveRepository from '../../../../src/repository/integracao/local.sql.server.cobranca.digital.chave.repository';

describe('CRUD (local.sql.server.chave.repository)', () => {
  const repository = new LocalSqlServerCobrancaDigitalChaveRepository();
  const chave = 'd9b86139-047c-423e-957a-09c9405fe8ef';
  const newEntity = new ChaveDto(999, 1, 1, '963187fc-ac10-4a54-a28c-382a38', 'A', new Date('2022-08-19'), chave);
  const upEntity = new ChaveDto(999, 1, 1, '963187fc-ac10-4a54-a28c-382a38', 'C', new Date('2022-08-20'), chave);

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
    expect(entity?.[0].status).toBe(newEntity.status);
  });

  it('deve atualizar registro gravado', async () => {
    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].status).toBe(upEntity.status);
  });

  it('deve deletar registro gravado', async () => {
    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
