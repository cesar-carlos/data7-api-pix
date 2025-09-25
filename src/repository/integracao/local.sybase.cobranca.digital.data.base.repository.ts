import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../../infra/connection.sybase';
import { Params, pagination } from '../../contracts/local.base.params';

import CobrancaDigitalDataBaseDto from '../../dto/integracao/cobranca.digital.data.base.dto';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ParamsCommonRepository from '../common/params.common';

export default class LocalSybaseCobrancaDigitalDataBaseRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalDataBaseDto>
{
  private connect = ConnectionSybase.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');

  public async select(): Promise<CobrancaDigitalDataBaseDto[]> {
    const pool = await (await this.connect.getConnection()).connect();
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.database.select.sql');
    const sql = fs.readFileSync(patchSQL).toString();
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return [];
    const dataConfgs = result.map((item: any) => {
      return CobrancaDigitalDataBaseDto.fromObject(item);
    });

    return dataConfgs;
  }

  public async selectWhere(params: Params[] = []): Promise<CobrancaDigitalDataBaseDto[]> {
    const pool = await (await this.connect.getConnection()).connect();
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.database.select.sql');
    const select = fs.readFileSync(patchSQL).toString();

    const _params = ParamsCommonRepository.build(params);
    const sql = _params ? `${select} WHERE ${_params}` : select;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return [];
    const dataConfgs = result.map((item: any) => {
      return CobrancaDigitalDataBaseDto.fromObject(item);
    });

    return dataConfgs;
  }

  public async insert(entity: CobrancaDigitalDataBaseDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.database.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: CobrancaDigitalDataBaseDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.database.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalDataBaseDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.database.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
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
      throw new Error(error.message);
    } finally {
      pool.close();
    }
  }
}
