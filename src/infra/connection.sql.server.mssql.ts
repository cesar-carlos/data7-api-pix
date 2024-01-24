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

  async getConnection(): Promise<sql.ConnectionPool> {
    try {
      const pool = await sql.connect(config as sql.config);
      return pool;
    } catch (error) {
      throw new Error('Erro na conexão com o banco de dados');
    }
  }

  async closeConnection(pool: sql.ConnectionPool): Promise<void> {
    await pool.close();
  }
}

//
// import sql from 'mssql';
// import { ConnectionPool } from 'mssql';

// import config from '../assets/config.msql';
// import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

// export default class ConnectionSqlServerMssql implements ConnectionBaseSqlContract<ConnectionPool> {
//   constructor() {}

//   async getConnection(): Promise<ConnectionPool> {
//     try {
//       const pool = await sql.connect(config as sql.config);
//       return pool;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   }

//   async closeConnection(pool: ConnectionPool): Promise<void> {
//     await pool.close();
//   }
// }
//
