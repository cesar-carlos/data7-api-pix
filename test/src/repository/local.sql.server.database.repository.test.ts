import CobrancaDigitalDataBaseDto from '../../../src/dto/cobranca.digital.data.base';
import LocalSqlServerCobrancaDigitalDataBaseRepository from '../../../src/repository/local.sql.server.cobranca.digital.data.base.repository';

test(`CRUD DATABASE LOCAL SQL-SERVER`, async () => {
  try {
    const repository = new LocalSqlServerCobrancaDigitalDataBaseRepository();

    //ESPERADO QUE RETORNE A ENTITY
    const inEntity = new CobrancaDigitalDataBaseDto(999, 'SQL-SERVER', 'sa', '123abc.', 'localhost', 'MSCar', 1433);
    await repository.insert(inEntity);
    const insert = await repository.selectWhere([{ key: 'CodCobrancaDigitalDataBase', value: 999 }]);
    expect(insert).not.toBeUndefined();
    expect(insert).not.toBeNull();
    expect(insert?.length).toBe(1);
    expect(insert?.[0].provedor === 'SQL-SERVER').toBeTruthy();

    //ESPERADO QUE RETORNE A ENTITY ALTERADA
    const upEntity = new CobrancaDigitalDataBaseDto(999, 'SYBASE', 'dba', 'sql', 'localhost', 'MSCar', 2638);
    await repository.update(upEntity);
    const update = await repository.selectWhere([{ key: 'CodCobrancaDigitalDataBase', value: 999 }]);
    expect(update).not.toBeUndefined();
    expect(update).not.toBeNull();
    expect(update?.length).toBe(1);
    expect(update?.[0].provedor === 'SYBASE').toBeTruthy();

    console.log(update![0]);
    //DELETE
    await repository.delete(update![0]);
  } catch (error: any) {
    error.message;
  }
});

export {};
