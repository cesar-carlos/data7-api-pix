import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import DemoDto from '../dto/demo.digital.dto';

export default class LocalSybaseDemoRepository implements LocalBaseRepositoryContract<DemoDto> {
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<DemoDto[] | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'demo.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const demosDto = result.map((item: any) => {
        return DemoDto.fromObject(item);
      });

      return demosDto;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<DemoDto[] | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'demo.select.sql');
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

      if (result.length === 0) return undefined;
      const demosDto = result.map((item: any) => {
        return DemoDto.fromObject(item);
      });

      return demosDto;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: DemoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'demo.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: DemoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'demo.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: DemoDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'demo.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: DemoDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      await transaction
        .request()
        .input('Id', sql.Int, entity.id)
        .input('Nome', sql.VarChar(100), entity.nome)
        .query(sqlCommand);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
