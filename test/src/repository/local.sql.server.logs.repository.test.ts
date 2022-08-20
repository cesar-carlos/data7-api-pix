import CobrancaDigitalLogDto from '../../../src/dto/cobranca.digital.log';
import LocalSqlServerCobrancaDigitalLogRepository from '../../../src/repository/local.sql.server.cobranca.digital.log.repository';

test(`CRUD LOGS LOCAL SQL-SERVER`, async () => {
  try {
    const repository = new LocalSqlServerCobrancaDigitalLogRepository();
    const uid = 'd1804d09-4cce-4df2-8889-a7a9be3ab3cd';

    //ESPERADO QUE RETORNE LOGS
    const newLogDto = new CobrancaDigitalLogDto(uid, 'MSG', 'DETAILS');
    await repository.insert(newLogDto);
    const insert = await repository.selectWhere([{ key: 'ID', value: uid }]);
    expect(insert).not.toBeUndefined();
    expect(insert).not.toBeNull();
    expect(insert?.length).toBe(1);
    expect(insert?.[0].message === 'MSG').toBeTruthy();

    //ESPERADO QUE RETORNE LOGS ALTERADA
    const upLogDto = new CobrancaDigitalLogDto(uid, 'MSG-UP', 'DETAILS-UP');
    await repository.update(upLogDto);
    const update = await repository.selectWhere([{ key: 'ID', value: uid }]);
    expect(update).not.toBeUndefined();
    expect(update).not.toBeNull();
    expect(update?.length).toBe(1);
    expect(update?.[0].message === 'MSG-UP').toBeTruthy();

    //DELETE LOGS
    await repository.delete(update![0]);
  } catch (error: any) {
    error.message;
  }
});

export {};
