import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';
import config from '../assets/config.tedious';

import { Connection } from 'tedious';

export default class ConnectionSqlServerTedious implements ConnectionBaseSqlContract<Connection> {
  constructor() {}

  getConnection(): Promise<Connection> {
    throw new Error('Method not implemented.');
  }

  closeConnection(conn: Connection): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
