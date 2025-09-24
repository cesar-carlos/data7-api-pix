import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, Pagination, OrderBy } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoTipoOperacaoExpedicaoDto from '../../dto/expedicao/expedicao.tipo.operacao.expedicao.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoTipoOperacaoExpedicaoRepository
  implements LocalBaseRepositoryContract<ExpedicaoTipoOperacaoExpedicaoDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoTipoOperacaoExpedicaoDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.expedicao.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();

      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoTipoOperacaoExpedicaoDto.fromObject(item);
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
  ): Promise<ExpedicaoTipoOperacaoExpedicaoDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.expedicao.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const paramOrderBy = orderBy && orderBy.isValid() ? `ORDER BY ${orderBy.getFullOrderBy()}` : '';
      const paramLimit = pagination ? `TOP ${pagination.limit}` : '';

      const _params = ParamsCommonRepository.build(params);
      const _sql = (_params ? `${select} WHERE ${_params} ${paramOrderBy}` : select).replaceAll('@@TOP@@', paramLimit);
      const result = await pool.request().query(_sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoTipoOperacaoExpedicaoDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoTipoOperacaoExpedicaoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.expedicao.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoTipoOperacaoExpedicaoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.expedicao.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoTipoOperacaoExpedicaoDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.expedicao.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoTipoOperacaoExpedicaoDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodTipoOperacaoExpedicao', sql.Int, entity.CodTipoOperacaoExpedicao)
        .input('Descricao', sql.VarChar(100), entity.Descricao)
        .input('Ativo', sql.VarChar(1), entity.Ativo)
        .input('Tipo', sql.VarChar(20), entity.Tipo)
        .input('CodSetorConferencia', sql.Int, entity.CodSetorConferencia)
        .input('CodPrioridade', sql.Int, entity.CodPrioridade)
        .input('CodRelatorio', sql.Int, entity.CodRelatorio)
        .input('CodLocalArmazenagem', sql.Int, entity.CodLocalArmazenagem)
        .input('MovimentaEstoque', sql.VarChar(1), entity.MovimentaEstoque)
        .input('CodTipoMovimentoEstoque', sql.Int, entity.CodTipoMovimentoEstoque)
        .input('FazerConferencia', sql.VarChar(1), entity.FazerConferencia)
        .input('FazerArmazenamento', sql.VarChar(1), entity.FazerArmazenamento)
        .input('ControlaLote', sql.VarChar(1), entity.ControlaLote)
        .input('ControlaNumeroSerie', sql.VarChar(1), entity.ControlaNumeroSerie)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      console.error('Erro em SqlServerExpedicaoTipoOperacaoExpedicaoRepository.actonEntity:', error.message);
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
