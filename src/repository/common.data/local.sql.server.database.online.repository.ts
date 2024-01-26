import fs from 'fs';
import path from 'path';
import { ConnectionPool } from 'mssql';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import ParamsCommonRepository from '../common/params.common';
import DataBaseActiveContract from '../../contracts/data.base.active.contract';
import DatabaseOnlineDto from '../../dto/common.data/database.online.dto';

export default class LocalSqlServerDatabaseOnlineRepository implements DataBaseActiveContract<DatabaseOnlineDto> {
  //private connect = new ConnectionSqlServerMssql();
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('common.data');

  public async getDataBaseInfo(): Promise<DatabaseOnlineDto | string> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patch = path.resolve(this.basePatchSQL, 'local.database.online.select.sql');
      const select = fs.readFileSync(patch).toString();
      const result = await pool.request().query(select);

      const data = result.recordset.map((item: any) => {
        return DatabaseOnlineDto.fromObject(item);
      });

      if (!data || data.length === 0) return 'Falha ao obter informacoes da base de dados (Local SQL-SERVER).';
      return data[0];
    } catch (error: any) {
      return `Falha ao obter informacoes da base de dados (Local SQL-SERVER). ${error.message}`;
    } finally {
      if (pool) pool.close();
    }
  }
}
