import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import CobrancaDigitalSituacaoDto from '../dto/cobranca.digital.situacao.dto';

export default class LocalSqlServerCobrancaDigitalSituacaoRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalSituacaoDto>
{
  private connect = new ConnectionSqlServerMssql();
  constructor() {}

  public async select(): Promise<CobrancaDigitalSituacaoDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.situacao.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalSituacaoDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalSituacaoDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.situacao.select.sql');
      const select = fs.readFileSync(patch).toString();

      const _params = params
        .map((item: any) => {
          const _value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
          return `${item.key} = ${_value}`;
        })
        .join(' AND ');

      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalSituacaoDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalSituacaoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.situacao.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalSituacaoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.situacao.update.sql');
      const update = fs.readFileSync(patch).toString();

      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalSituacaoDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.situacao.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalSituacaoDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('SysId', sql.VarChar(500), entity.sysId)
        .input('Sequencia', sql.Int, entity.sequencia)
        .input('Status', sql.VarChar(1), entity.status)
        .input('TxId', sql.VarChar(500), entity.txId)
        .input('LocId', sql.VarChar(500), entity.locId)
        .input('Chave', sql.VarChar(100), entity.chave)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
