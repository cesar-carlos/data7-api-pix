import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../../contracts/local.base.repository.contract';
import ChaveDto from '../../dto/chave.dto';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import ParamsCommonRepository from '../common.repository/params.common.repository';

export default class LocalSqlServerCobrancaDigitalChaveRepository implements LocalBaseRepositoryContract<ChaveDto> {
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');

  public async select(): Promise<ChaveDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.chaves.select.sql');
    const select = fs.readFileSync(patchSQL).toString();
    const result = await pool.request().query(select);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const chaves = result.recordset.map((item: any) => {
      return ChaveDto.fromObject(item);
    });

    return chaves;
  }

  public async selectWhere(params: params[]): Promise<ChaveDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.chaves.select.sql');
    const select = fs.readFileSync(patchSQL).toString();

    const _params = ParamsCommonRepository.build(params);
    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const chaves = result.recordset.map((item: any) => {
      return ChaveDto.fromObject(item);
    });

    return chaves;
  }

  public async insert(entity: ChaveDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.chaves.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ChaveDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.chaves.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ChaveDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.chaves.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ChaveDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
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

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
