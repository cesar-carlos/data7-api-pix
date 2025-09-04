import sql, { ConnectionPool, config as SqlConfig } from 'mssql';

import config from '../assets/config.msql';

export default class ConnectionSqlServerMssql {
  private static instance: ConnectionSqlServerMssql;
  private pool: ConnectionPool | null = null;
  private isInitializing: boolean = false;

  private constructor() {
    this.initPool().catch((error) => {
      console.error('Erro ao inicializar pool de conexão:', error);
      throw error;
    });
  }

  private async initPool(): Promise<void> {
    if (this.isInitializing) {
      return;
    }

    this.isInitializing = true;
    try {
      this.pool = new sql.ConnectionPool(config as SqlConfig);
      await this.pool.connect();
      console.log('Pool de conexão inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar pool:', error);
      throw new Error(
        `Falha ao inicializar pool de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
    } finally {
      this.isInitializing = false;
    }
  }

  public static getInstance(): ConnectionSqlServerMssql {
    if (!ConnectionSqlServerMssql.instance) {
      ConnectionSqlServerMssql.instance = new ConnectionSqlServerMssql();
    }
    return ConnectionSqlServerMssql.instance;
  }

  async getConnection(): Promise<ConnectionPool> {
    if (!this.pool) {
      await this.initPool();
    }

    if (!this.pool) {
      throw new Error('Pool de conexão não inicializado após tentativa de inicialização');
    }

    return this.pool;
  }

  async closePool(): Promise<void> {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        console.log('Pool de conexão fechado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao fechar pool:', error);
      throw new Error(
        `Falha ao fechar pool de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
    }
  }
}
