import CobrancaDigitalConfigDto from '../../../src/dto/cobranca.digital.config';
import LocalSqlServerCobrancaDigitalConfigRepository from '../../../src/repository/local.sql.server.cobranca.digital.config.repository';

test(`CRUD CONFIG LOCAL SQL-SERVER`, async () => {
  try {
    const repository = new LocalSqlServerCobrancaDigitalConfigRepository();

    //ESPERADO QUE RETORNE A CONFIG
    const inConfig = new CobrancaDigitalConfigDto(999, 1, 'A', 'TEST', 'clientId', 'clientSecret', 'certificado');
    await repository.insert(inConfig);
    const insert = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodConfiguracao', value: 1 },
    ]);
    expect(insert).not.toBeUndefined();
    expect(insert).not.toBeNull();
    expect(insert?.length).toBe(1);
    expect(insert?.[0].ativo === 'A').toBeTruthy();

    //ESPERADO QUE RETORNE A CONFIG ALTERADA
    const upConfig = new CobrancaDigitalConfigDto(999, 1, 'C', 'TEST', 'clientId', 'clientSecret', 'certificado');
    await repository.update(upConfig);
    const update = await repository.selectWhere([
      { key: 'CodEmpresa', value: 999 },
      { key: 'CodConfiguracao', value: 1 },
    ]);
    expect(update).not.toBeUndefined();
    expect(update).not.toBeNull();
    expect(update?.length).toBe(1);
    expect(update?.[0].ativo === 'C').toBeTruthy();

    //DELETE CONFIG
    await repository.delete(update![0]);
  } catch (error: any) {
    error.message;
  }
});

export {};
