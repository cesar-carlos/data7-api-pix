import ChaveDto from '../../../src/dto/chave.dto';
import LocalSqlServerCobrancaDigitalChaveRepository from '../../../src/repository/local.sql.server.cobranca.digital.chave.repository';

test(`CRUD CHAVE LOCAL SQL-SERVER`, async () => {
  try {
    const repository = new LocalSqlServerCobrancaDigitalChaveRepository();

    //ESPERADO QUE RETORNE A CHAVE
    const nwChave = 'd9b86139-047c-423e-957a-09c9405fe8ef';
    const newChaveDto = new ChaveDto(999, 1, 1, 'UUID', 'A', new Date('2022-08-19'), nwChave);
    await repository.insert(newChaveDto);
    const insert = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodFilial', value: 1 },
      { key: 'CodCobrancaDigital', value: 1 },
    ]);
    expect(insert).not.toBeUndefined();
    expect(insert).not.toBeNull();
    expect(insert?.length).toBe(1);
    expect(insert?.[0].chave === nwChave).toBeTruthy();

    //ESPERADO QUE RETORNE A CHAVE ALTERADA
    const upChave = 'd9b86139-047c-423e-957a-09c9405febbb';
    const upChaveDto = new ChaveDto(999, 1, 1, 'UUID', 'C', new Date('2022-08-19'), upChave);
    await repository.update(upChaveDto);
    const update = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodFilial', value: 1 },
      { key: 'CodCobrancaDigital', value: 1 },
    ]);
    expect(update).not.toBeUndefined();
    expect(update).not.toBeNull();
    expect(update?.length).toBe(1);
    expect(update?.[0].chave === upChave).toBeTruthy();

    //DELETE CHAVE
    await repository.delete(update![0]);
  } catch (error: any) {
    error.message;
  }
});

export {};
