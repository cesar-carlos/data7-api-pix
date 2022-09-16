import { ConnectionSybase } from '../../../src/infra/connection.sybase';
import confg from '../../../src/assets/config.sybase';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Int, VarChar } from 'mssql';

describe('CRUD (Integracao.CobrancaDigitalChave)', () => {
  it('', async () => {
    const Id = 1;
    const Nome = 'TESTE DE SISTEMA';
    const PathFile = resolve(__dirname, '../../../src/sql/insert.demo.sql');
    const InsertSQLModel = readFileSync(PathFile, 'utf8');

    const conn = new ConnectionSybase(confg);

    const request = conn.request();
    request.input('Id', Int, Id);
    request.input('Nome', VarChar, Nome);
    const result = await request.query(InsertSQLModel);

    console.log(result);
  });
});

export default {};
