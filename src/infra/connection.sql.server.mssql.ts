import sql from 'mssql';
import { ConnectionPool } from 'mssql';

import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';
import config from '../assets/config.msql';

export default class ConnectionSqlServerMssql implements ConnectionBaseSqlContract<ConnectionPool> {
  private static instance: ConnectionSqlServerMssql;
  private constructor() {}

  public static getInstance(): ConnectionSqlServerMssql {
    if (!ConnectionSqlServerMssql.instance) {
      ConnectionSqlServerMssql.instance = new ConnectionSqlServerMssql();
    }

    return ConnectionSqlServerMssql.instance;
  }

  async getConnection(maxAttempts: number = 10, interval: number = 600): Promise<sql.ConnectionPool> {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const pool = await sql.connect(config as sql.config);
        return pool;
      } catch (error) {
        lastError = error;
        console.error(`Tentativa ${attempt} falhou:`, error);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, interval));
        }
      }
    }

    console.error('Todas as tentativas falharam');
    throw new Error('Erro na conexão com o banco de dados');
  }

  async closeConnection(pool: sql.ConnectionPool): Promise<void> {
    await pool.close();
  }
}
