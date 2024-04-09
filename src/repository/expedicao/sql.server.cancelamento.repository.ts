import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCancelamentoDto from '../../dto/expedicao/expedicao.cancelamento.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerCancelamentoRepository implements LocalBaseRepositoryContract<ExpedicaoCancelamentoDto> {
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoCancelamentoDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.cancelamento.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoCancelamentoDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCancelamentoDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.cancelamento.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoCancelamentoDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoCancelamentoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.cancelamento.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoCancelamentoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.cancelamento.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoCancelamentoDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.cancelamento.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoCancelamentoDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodCancelamento', sql.Int, entity.CodCancelamento)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('CodOrigem', sql.Int, entity.CodOrigem)
        .input('ItemOrigem', sql.VarChar(5), entity.ItemOrigem)
        .input('CodMotivoCancelamento', sql.Int, entity.CodMotivoCancelamento)
        .input('DataCancelamento', sql.Date, entity.DataCancelamento)
        .input('HoraCancelamento', sql.VarChar(8), entity.HoraCancelamento)
        .input('CodUsuarioCancelamento', sql.Int, entity.CodUsuarioCancelamento)
        .input('NomeUsuarioCancelamento', sql.VarChar(30), entity.NomeUsuarioCancelamento)
        .input('ObservacaoCancelamento', sql.VarChar(2000), entity.ObservacaoCancelamento)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
