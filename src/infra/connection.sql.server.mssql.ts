import sql, { ConnectionPool } from 'mssql';

import config from '../assets/config.msql';

export default class ConnectionSqlServerMssql {
  private static instance: ConnectionSqlServerMssql;
  private pool: ConnectionPool | null = null;

  private interval: number = 700;
  private retryInterval: number = 1000;
  private maxAttempts: number = 5;

  private constructor() {
    this.initPool();
  }

  private async initPool(attempt: number = 5): Promise<void> {
    if (attempt > this.maxAttempts) {
      throw new Error('Erro ao estabelecer o pool de conexões');
    }

    try {
      this.pool = new sql.ConnectionPool(config as sql.config);
      await this.pool.connect();
    } catch (error) {
      console.error(`Tentativa ${attempt} falhou:`, error);
      await new Promise((resolve) => setTimeout(resolve, this.interval));
      await this.initPool(attempt + 1);
    }
  }

  public static getInstance(): ConnectionSqlServerMssql {
    if (!ConnectionSqlServerMssql.instance) {
      ConnectionSqlServerMssql.instance = new ConnectionSqlServerMssql();
    }

    return ConnectionSqlServerMssql.instance;
  }

  async getConnection(attempt: number = 5): Promise<ConnectionPool> {
    try {
      if (this.pool) return this.pool;

      if (attempt < this.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, this.retryInterval));
        return this.getConnection(attempt + 1);
      } else {
        throw new Error('Não foi possível obter uma conexão após várias tentativas');
      }
    } catch (error: any) {
      throw new Error(`Erro ao obter conexão: ${error.message}`);
    }
  }

  async closePool(): Promise<void> {
    if (this.pool) await this.pool.close();
  }
}
