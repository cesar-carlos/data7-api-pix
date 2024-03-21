import sql, { ConnectionPool } from 'mssql';

import config from '../assets/config.msql';

export default class ConnectionSqlServerMssql {
  private static instance: ConnectionSqlServerMssql;
  private pool: ConnectionPool | null = null;

  private constructor() {
    this.initPool();
  }

  private async initPool(): Promise<void> {
    this.pool = new sql.ConnectionPool(config as sql.config);

    try {
      await this.pool.connect();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public static getInstance(): ConnectionSqlServerMssql {
    if (!ConnectionSqlServerMssql.instance) {
      ConnectionSqlServerMssql.instance = new ConnectionSqlServerMssql();
    }

    return ConnectionSqlServerMssql.instance;
  }

  async getConnection(): Promise<ConnectionPool> {
    try {
      if (this.pool) return this.pool;

      throw new Error(`Erro ao obter conexão: pool não inicializado.`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async closePool(): Promise<void> {
    if (this.pool) await this.pool.close();
  }
}
