import { ConnectionPool } from 'mssql';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';

import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class LocalSqlServerSequences implements LocalBaseRepositorySequenceContract<SequenceDto> {
  //private connect = new ConnectionSqlServerMssql();
  private connect = ConnectionSqlServerMssql.getInstance();

  public async select(name: string): Promise<SequenceDto | undefined> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const sql = `SELECT NEXT VALUE FOR ${name} value`;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return undefined;
      const sequence: SequenceDto[] = result.recordset.map((item: any) => {
        const value = Number.parseInt(item.value) ?? 0;
        return new SequenceDto({ Nome: name, Valor: value });
      });

      return sequence.shift();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      if (pool) pool.close();
    }
  }
}
