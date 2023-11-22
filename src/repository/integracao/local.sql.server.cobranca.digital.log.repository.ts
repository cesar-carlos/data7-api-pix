import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import CobrancaDigitalLogDto from '../../dto/integracao/cobranca.digital.log.dto';
import ParamsCommonRepository from '../common/params.common';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';

export default class LocalSqlServerCobrancaDigitalLogRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalLogDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');

  public async select(): Promise<CobrancaDigitalLogDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.log.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(select);
      pool.close();

      if (result.recordset.length === 0) return [];
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalLogDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<CobrancaDigitalLogDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.log.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalLogDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalLogDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.log.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: CobrancaDigitalLogDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.log.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalLogDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.log.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalLogDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('ID', sql.VarChar(500), entity.id)
        .input('Message', sql.VarChar(2000), entity.message)
        .input('Details', sql.VarChar(2000), entity.details)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}