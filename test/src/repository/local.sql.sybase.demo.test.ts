import { ConnectionSybase } from '../../../src/infra/connection.sybase';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Int, VarChar } from 'mssql';

import confg from '../../../src/assets/config.sybase';

describe('CRUD (Sybase DEMO)', () => {
  it('DEVE FAZER O INSERT', async () => {
    try {
      const Id = 1;
      const Nome = 'TESTE DE SISTEMA';

      const DelPathFile = resolve(__dirname, '../../../src/sql/demo.delete.sql');
      const PathFile = resolve(__dirname, '../../../src/sql/demo.insert.sql');

      const DelSQLModel = readFileSync(DelPathFile, 'utf8');
      const InsertSQLModel = readFileSync(PathFile, 'utf8');

      const conn = new ConnectionSybase(confg);

      const del = conn.request().input('Id', Int, Id);
      const delResult = await del.query(DelSQLModel);

      const request = conn.request().input('Id', Int, Id).input('Nome', VarChar, Nome);
      const resultInsert = await request.query(InsertSQLModel);
    } catch (error: any) {
      console.log(error);
    }
  });
});

export default {};
