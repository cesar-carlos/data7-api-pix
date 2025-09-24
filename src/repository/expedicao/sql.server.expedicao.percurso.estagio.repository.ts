import fs from 'fs';
import path from 'path';
import sql, { ConnectionPool } from 'mssql';

import { params, Pagination, OrderBy } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoPercursoEstagioDto from '../../dto/expedicao/expedicao.percurso.estagio.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoPercursoEstagioRepository
  implements LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoPercursoEstagioDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.estagio.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoPercursoEstagioDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoPercursoEstagioDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.estagio.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const paramOrderBy = orderBy && orderBy.isValid() ? `ORDER BY ${orderBy.getFullOrderBy()}` : '';
      const paramLimit = pagination ? `TOP ${pagination.limit}` : '';

      const _params = ParamsCommonRepository.build(params);
      const _sql = (_params ? `${select} WHERE ${_params} ${paramOrderBy}` : select).replaceAll('@@TOP@@', paramLimit);
      const result = await pool.request().query(_sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoPercursoEstagioDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoPercursoEstagioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.estagio.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoPercursoEstagioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.estagio.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoPercursoEstagioDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.estagio.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoPercursoEstagioDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodPercursoEstagio', sql.Int, entity.CodPercursoEstagio)
        .input('Descricao', sql.VarChar(100), entity.Descricao)
        .input('Ativo', sql.VarChar(1), entity.Ativo)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('Sequencia', sql.Int, entity.Sequencia)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
