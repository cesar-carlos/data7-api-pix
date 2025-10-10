import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { Params, Pagination, OrderBy } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoAgrupamento from '../../dto/expedicao/expedicao.carrinho.percurso.agrupamento';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoCarrinhoPercursoAgrupamentoRepository
  implements LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoAgrupamento>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoCarrinhoPercursoAgrupamento[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.agrupamento.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoPercursoAgrupamento.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(
    params: Params[] = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoCarrinhoPercursoAgrupamento[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.agrupamento.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const paramOrderBy =
        orderBy && orderBy.isValid() ? `ORDER BY ${orderBy.getFullOrderBy()}` : 'ORDER BY (SELECT NULL)';
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const sqlWithPagination = `${sql} ${paramOrderBy} OFFSET ${pagination?.offset} ROWS FETCH NEXT ${pagination?.limit} ROWS ONLY`;
      const sqlWithoutPagination = `${sql} ${paramOrderBy}`;
      const result = await pool.request().query(pagination ? sqlWithPagination : sqlWithoutPagination);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoPercursoAgrupamento.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoCarrinhoPercursoAgrupamento): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.agrupamento.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insertWithReturn(
    entity: ExpedicaoCarrinhoPercursoAgrupamento,
  ): Promise<ExpedicaoCarrinhoPercursoAgrupamento> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.agrupamento.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      const result = await this.actonEntityWithReturn(entity, insert);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoCarrinhoPercursoAgrupamento): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.agrupamento.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoCarrinhoPercursoAgrupamento): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.agrupamento.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoCarrinhoPercursoAgrupamento, sqlCommand: string): Promise<void> {
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
        .input('ItemCarrinhoPercurso', sql.VarChar(5), entity.ItemCarrinhoPercurso)
        .input('Situacao', sql.VarChar(30), entity.Situacao)
        .input('CodCarrinhoAgrupador', sql.Int, entity.CodCarrinhoAgrupador)
        .input('DataLancamento', sql.Date, entity.DataLancamento)
        .input('HoraLancamento', sql.VarChar(8), entity.HoraLancamento)
        .input('CodUsuarioLancamento', sql.Int, entity.CodUsuarioLancamento)
        .input('NomeUsuarioLancamento', sql.VarChar(100), entity.NomeUsuarioLancamento)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      console.error('Erro em SqlServerExpedicaoCarrinhoPercursoAgrupamentoRepository.actonEntity:', error.message);
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }

  private async actonEntityWithReturn(
    entity: ExpedicaoCarrinhoPercursoAgrupamento,
    sqlCommand: string,
  ): Promise<ExpedicaoCarrinhoPercursoAgrupamento> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      const result = await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodCarrinhoPercurso', sql.Int, entity.CodCarrinhoPercurso)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('ItemCarrinhoPercurso', sql.VarChar(5), entity.ItemCarrinhoPercurso)
        .input('Situacao', sql.VarChar(30), entity.Situacao)
        .input('CodCarrinhoAgrupador', sql.Int, entity.CodCarrinhoAgrupador)
        .input('DataLancamento', sql.Date, entity.DataLancamento)
        .input('HoraLancamento', sql.VarChar(8), entity.HoraLancamento)
        .input('CodUsuarioLancamento', sql.Int, entity.CodUsuarioLancamento)
        .input('NomeUsuarioLancamento', sql.VarChar(100), entity.NomeUsuarioLancamento)
        .query(sqlCommand);

      await transaction.commit();

      if (result.recordset && result.recordset.length > 0) {
        return ExpedicaoCarrinhoPercursoAgrupamento.fromObject(result.recordset[0]);
      }

      throw new Error('Nenhum registro foi inserido');
    } catch (error: any) {
      console.error(
        'Erro em SqlServerExpedicaoCarrinhoPercursoAgrupamentoRepository.actonEntityWithReturn:',
        error.message,
      );
      transaction.rollback();
      throw new Error(error.message);
    }
  }
}
