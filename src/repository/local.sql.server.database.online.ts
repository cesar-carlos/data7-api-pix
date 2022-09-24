import fs from 'fs';
import path from 'path';

import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import DatabaseOnlineDto from '../dto/database.online.dto';
import DataBaseActiveContract from '../contracts/data.base.active.contract';

export default class LocalSqlServerDatabaseOnline implements DataBaseActiveContract<DatabaseOnlineDto> {
  private connect = new ConnectionSqlServerMssql();
  constructor() {}

  public async getDataBaseInfo(): Promise<DatabaseOnlineDto | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'local.database.online.select.sql');
      const select = fs.readFileSync(patch).toString();
      const result = await pool.request().query(select);
      pool.close();

      const data = result.recordset.map((item: any) => {
        return DatabaseOnlineDto.fromObject(item);
      });

      if (!data || data.length === 0) {
        return undefined;
      }

      return data.shift();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
