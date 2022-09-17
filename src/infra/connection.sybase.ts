import { DriverConnectionSybase } from './driver.connection.sybase';

import config from '../assets/config.sybase';
import ConnectionBaseSqlContract from '../contracts/connection.base.sql.contract';

export class ConnectionSybase implements ConnectionBaseSqlContract<DriverConnectionSybase> {
  async getConnection(): Promise<DriverConnectionSybase> {
    const pool = new DriverConnectionSybase(config);
    return pool;
  }

  async closeConnection(pool: DriverConnectionSybase): Promise<void> {
    await pool.close();
  }
}
