import fs from 'fs';
import path from 'path';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import DatabaseOnlineDto from '../../dto/database.online.dto';
import DataBaseActiveContract from '../../contracts/data.base.active.contract';
import ParamsCommonRepository from '../common.repository/params.common.repository';

export default class LocalSqlServerDatabaseOnlineRepository implements DataBaseActiveContract<DatabaseOnlineDto> {
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');
  public async getDataBaseInfo(): Promise<DatabaseOnlineDto | string> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(this.basePatchSQL, 'local.database.online.select.sql');
      const select = fs.readFileSync(patch).toString();
      const result = await pool.request().query(select);
      pool.close();

      const data = result.recordset.map((item: any) => {
        return DatabaseOnlineDto.fromObject(item);
      });

      if (!data || data.length === 0) return 'Falha ao obter informacoes da base de dados (Local SQL-SERVER).';
      return data[0];
    } catch (error: any) {
      return `Falha ao obter informacoes da base de dados (Local SQL-SERVER). ${error.message}`;
    }
  }
}
