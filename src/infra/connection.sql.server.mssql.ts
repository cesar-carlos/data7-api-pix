import sql, { ConnectionPool, config as SqlConfig } from 'mssql';
import config from '../assets/config.msql';

export default class ConnectionSqlServerMssql {
  private static instance: ConnectionSqlServerMssql;
  private pool: ConnectionPool | null = null;
  private isInitializing: boolean = false;
  private isClosing: boolean = false;

  private constructor() {}

  private async initPool(): Promise<void> {
    if (this.isInitializing || this.isClosing) {
      while (this.isInitializing || this.isClosing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return;
    }

    if (this.pool && this.pool.connected) {
      return;
    }

    this.isInitializing = true;

    try {
      const poolConfig: SqlConfig = {
        ...config,
        connectionTimeout: 30000,
        requestTimeout: 30000,
        pool: {
          max: 10,
          min: 2,
          idleTimeoutMillis: 30000,
          acquireTimeoutMillis: 60000,
        },
        options: {
          ...config.options,
          trustServerCertificate: true,
          enableArithAbort: true,
          encrypt: false,
        },
      } as SqlConfig;

      this.pool = new ConnectionPool(poolConfig);

      this.pool.on('connect', () => {
        console.log('Pool de conexão conectado com sucesso');
      });

      this.pool.on('close', () => {
        console.log('Pool de conexão fechado');
        this.pool = null;
      });

      this.pool.on('error', (err) => {
        console.error('Erro no pool de conexão:', err);
        this.pool = null;
      });

      await this.pool.connect();
    } catch (error) {
      console.error('Erro ao inicializar pool:', error);
      this.pool = null;
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
    if (this.pool && this.pool.connected) {
      return this.pool;
    }

    if (this.pool && !this.pool.connected) {
      console.log('Pool desconectado, tentando reconectar...');
      this.pool = null;
    }

    await this.initPool();

    if (!this.pool || !this.pool.connected) {
      throw new Error('Falha ao estabelecer conexão com o banco de dados');
    }

    return this.pool;
  }

  async closePool(): Promise<void> {
    if (this.isClosing) {
      return;
    }

    this.isClosing = true;

    try {
      if (this.pool) {
        if (this.pool.connected) {
          await this.pool.close();
        }
        this.pool = null;
        console.log('Pool de conexão fechado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao fechar pool:', error);
      this.pool = null;
      throw new Error(
        `Falha ao fechar pool de conexão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      );
    } finally {
      this.isClosing = false;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.pool || !this.pool.connected) {
        return false;
      }

      const result = await this.pool.request().query('SELECT 1 as health');
      return result.recordset.length > 0;
    } catch (error) {
      console.error('Health check falhou:', error);
      return false;
    }
  }

  getPoolStats() {
    if (!this.pool) {
      return null;
    }

    return {
      connected: this.pool.connected,
      connecting: this.pool.connecting,
      healthy: this.pool.healthy,
    };
  }

  static async shutdown(): Promise<void> {
    if (ConnectionSqlServerMssql.instance) {
      await ConnectionSqlServerMssql.instance.closePool();
      ConnectionSqlServerMssql.instance = null as any;
    }
  }
}

process.on('SIGINT', async () => {
  console.log('Recebido SIGINT, fechando pool de conexão...');
  await ConnectionSqlServerMssql.shutdown();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Recebido SIGTERM, fechando pool de conexão...');
  await ConnectionSqlServerMssql.shutdown();
  process.exit(0);
});
