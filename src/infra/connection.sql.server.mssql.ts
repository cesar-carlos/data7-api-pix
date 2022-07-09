import sql, { ConnectionPool } from 'mssql';
import config from '../assets/config.msql';
import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export default class ConnectionSqlServerMssql implements ConnectionBaseSqlContract<ConnectionPool> {
  constructor() {}

  async getConnection(): Promise<ConnectionPool> {
    const conn = await sql.connect(config);
    return conn;
  }

  async closeConnection(conn: ConnectionPool): Promise<void> {
    await conn.close();
  }
}
