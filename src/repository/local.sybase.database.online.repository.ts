import fs from 'fs';
import path from 'path';

import { ConnectionSybase } from '../infra/connection.sybase';

import DatabaseOnlineDto from '../dto/database.online.dto';
import DataBaseActiveContract from '../contracts/data.base.active.contract';

export default class LocalSybaseDatabaseOnlineRepository<DatabaseOnlineDto>
  implements DataBaseActiveContract<DatabaseOnlineDto | string>
{
  private connect = new ConnectionSybase();
  public async getDataBaseInfo(): Promise<DatabaseOnlineDto | string> {
    try {
      const connection = await this.connect.getConnection();
      const pool = await connection.connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'local.database.online.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return `Falha ao obter informacoes da base de dados (On-Line: SyBase).`;
      const databaseOnlineDto = result.map((item: any) => {
        return DatabaseOnlineDto.fromObject(item);
      });

      return databaseOnlineDto.shift();
    } catch (error: any) {
      return `Falha ao obter informacoes da base de dados (On-Line: SyBase). ${error.message}`;
    }
  }
}
