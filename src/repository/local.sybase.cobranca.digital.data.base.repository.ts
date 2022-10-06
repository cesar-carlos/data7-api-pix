import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import CobrancaDigitalDataBaseDto from '../dto/cobranca.digital.data.base.dto';

export default class LocalSybaseCobrancaDigitalDataBaseRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalDataBaseDto>
{
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<CobrancaDigitalDataBaseDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.database.select.sql');
    const sql = fs.readFileSync(patch).toString();
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return undefined;
    const dataConfgs = result.map((item: any) => {
      return CobrancaDigitalDataBaseDto.fromObject(item);
    });

    return dataConfgs;
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalDataBaseDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.database.select.sql');
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
    const dataConfgs = result.map((item: any) => {
      return CobrancaDigitalDataBaseDto.fromObject(item);
    });

    return dataConfgs;
  }

  public async insert(entity: CobrancaDigitalDataBaseDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.database.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalDataBaseDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.database.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalDataBaseDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.database.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalDataBaseDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      await transaction
        .request()
        .input('CodCobrancaDigitalDataBase', sql.Int, entity.codCobrancaDigitalDataBase)
        .input('Provedor', sql.VarChar(30), entity.provedor)
        .input('Usuario', sql.VarChar(30), entity.usuario)
        .input('Senha', sql.VarChar(60), entity.senha)
        .input('Servidor', sql.VarChar(255), entity.servidor)
        .input('Base', sql.VarChar(30), entity.base)
        .input('Porta', sql.Int, entity.porta)
        .query(sqlCommand);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
