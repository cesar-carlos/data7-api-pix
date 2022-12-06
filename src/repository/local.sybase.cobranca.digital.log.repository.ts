import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import CobrancaDigitalLogDto from '../dto/cobranca.digital.log.dto';

export default class LocalSybaseCobrancaDigitalLogRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalLogDto>
{
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<CobrancaDigitalLogDto[] | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.log.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const logs = result.map((item: any) => {
        return CobrancaDigitalLogDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalLogDto[] | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.log.select.sql');
      const select = fs.readFileSync(patch).toString();

      const _params = params
        .map((item: any) => {
          const _value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
          const _operator = item.operator ? item.operator : '=';
          return `${item.key} ${_operator} ${_value}`;
        })
        .join(' AND ');

      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const logs = result.map((item: any) => {
        return CobrancaDigitalLogDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalLogDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.log.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalLogDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.log.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalLogDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.log.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalLogDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      await transaction
        .request()
        .input('ID', sql.VarChar(500), entity.id)
        .input('Message', sql.VarChar(2000), entity.message)
        .input('Details', sql.VarChar(2000), entity.details)
        .query(sqlCommand);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
