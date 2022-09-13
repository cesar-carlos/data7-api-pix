import sql, { ConnectionPool } from 'mssql';
import config from '../assets/config.msql';
import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSqlServerMssql implements ConnectionBaseSqlContract<ConnectionPool> {
  constructor() {}

  async getConnection(): Promise<ConnectionPool> {
    const pool = await sql.connect(config);
    return pool;
  }

  async closeConnection(pool: ConnectionPool): Promise<void> {
    await pool.close();
  }
}
