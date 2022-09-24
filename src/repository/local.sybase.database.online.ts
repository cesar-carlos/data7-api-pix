import fs from 'fs';
import path from 'path';

import { ConnectionSybase } from '../infra/connection.sybase';
import DatabaseOnlineDto from '../dto/database.online.dto';
import DataBaseActiveContract from '../contracts/data.base.active.contract';

export default class LocalSybaseDatabaseOnline<DatabaseOnlineDto>
  implements DataBaseActiveContract<DatabaseOnlineDto | undefined>
{
  private connect = new ConnectionSybase();
  constructor() {}

  public async getDataBaseInfo(): Promise<DatabaseOnlineDto | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'local.database.online.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const databaseOnlineDto = result.map((item: any) => {
        return DatabaseOnlineDto.fromObject(item);
      });

      return databaseOnlineDto.shift();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
