import fs from 'fs';
import path from 'path';
import sql, { ConnectionPool } from 'mssql';

import { params, Pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoCarrinhoPercursoEstagioRepository
  implements LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoPercursoEstagioDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(
    params: params[] | string = [],
    limit?: number,
    orderBy?: string,
  ): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const paramOrderBy = orderBy ? `ORDER BY CodCarrinhoPercurso ${orderBy}` : '';
      const paramLimit = limit ? `TOP ${limit}` : '';

      const _params = ParamsCommonRepository.build(params);
      const _sql = (_params ? `${select} WHERE ${_params} ${paramOrderBy}` : select).replaceAll('@@TOP@@', paramLimit);

      const result = await pool.request().query(_sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoPercursoEstagioDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoCarrinhoPercursoEstagioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoCarrinhoPercursoEstagioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoCarrinhoPercursoEstagioDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoCarrinhoPercursoEstagioDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodCarrinhoPercurso', sql.Int, entity.CodCarrinhoPercurso)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('CodOrigem', sql.Int, entity.CodOrigem)
        .input('CodPercursoEstagio', sql.Int, entity.CodPercursoEstagio)
        .input('CodCarrinho', sql.Int, entity.CodCarrinho)
        .input('Situacao', sql.VarChar(30), entity.Situacao)
        .input('DataInicio', sql.Date, entity.DataInicio)
        .input('HoraInicio', sql.VarChar(8), entity.HoraInicio)
        .input('CodUsuarioInicio', sql.Int, entity.CodUsuarioInicio)
        .input('NomeUsuarioInicio', sql.VarChar(20), entity.NomeUsuarioInicio)
        .input('DataFinalizacao', sql.Date, entity.DataFinalizacao)
        .input('HoraFinalizacao', sql.VarChar(8), entity.HoraFinalizacao)
        .input('CodUsuarioFinalizacao', sql.Int, entity.CodUsuarioFinalizacao)
        .input('NomeUsuarioFinalizacao', sql.VarChar(20), entity.NomeUsuarioFinalizacao)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
