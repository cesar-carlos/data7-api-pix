import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';
import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ChaveDto from '../dto/chave.dto';

export default class LocalSybaseCobrancaDigitalChaveRepository implements LocalBaseRepositoryContract<ChaveDto> {
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<ChaveDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.chaves.select.sql');
    const sql = fs.readFileSync(patch).toString();
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset === 0) return undefined;
    const chaves = result.map((item: any) => {
      return ChaveDto.fromObject(item);
    });

    return chaves;
  }

  public async selectWhere(params: params[]): Promise<ChaveDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.chaves.select.sql');
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
    const chaves = result.map((item: any) => {
      return ChaveDto.fromObject(item);
    });

    return chaves;
  }

  public async insert(entity: ChaveDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.chaves.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: ChaveDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.chaves.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: ChaveDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.chaves.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ChaveDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodFilial', sql.Int, entity.codFilial)
        .input('CodCobrancaDigital', sql.Int, entity.codCobrancaDigital)
        .input('UUID', sql.VarChar(500), entity.uuid)
        .input('Status', sql.VarChar(1), entity.status)
        .input('DataCriacao', sql.Date, entity.dataCriacao)
        .input('Chave', sql.VarChar(255), entity.chave)
        .query(sqlCommand);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
