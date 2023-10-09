import sql from 'mssql';
import { ConnectionPool } from 'mssql';

import config from '../assets/config.msql';
import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSqlServerMssql implements ConnectionBaseSqlContract<ConnectionPool> {
  constructor() {}

  async getConnection(): Promise<ConnectionPool> {
    try {
      const pool = await sql.connect(config);
      return pool;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async closeConnection(pool: ConnectionPool): Promise<void> {
    await pool.close();
  }
}
