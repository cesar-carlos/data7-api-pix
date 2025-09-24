import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, Pagination, OrderBy } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoTipoOperacaoArmazenagemDto from '../../dto/expedicao/expedicao.tipo.operacao.armazenagem.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoTipoOperacaoArmazenagemRepository
  implements LocalBaseRepositoryContract<ExpedicaoTipoOperacaoArmazenagemDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoTipoOperacaoArmazenagemDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.armazenagem.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoTipoOperacaoArmazenagemDto.fromObject(item);
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
  ): Promise<ExpedicaoTipoOperacaoArmazenagemDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.armazenagem.select.sql');
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
        return ExpedicaoTipoOperacaoArmazenagemDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoTipoOperacaoArmazenagemDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.armazenagem.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoTipoOperacaoArmazenagemDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.armazenagem.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoTipoOperacaoArmazenagemDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.armazenagem.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoTipoOperacaoArmazenagemDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodTipoOperacaoArmazenagem', sql.Int, entity.CodTipoOperacaoArmazenagem)
        .input('Descricao', sql.VarChar(100), entity.Descricao)
        .input('Ativo', sql.VarChar(1), entity.Ativo)
        .input('CodPrioridade', sql.Int, entity.CodPrioridade)
        .input('CodRelatorio', sql.Int, entity.CodRelatorio)
        .input('CodLocalArmazenagem', sql.Int, entity.CodLocalArmazenagem)
        .input('CodSetorArmazenagem', sql.Int, entity.CodSetorArmazenagem)
        .input('MovimentaEstoque', sql.VarChar(1), entity.MovimentaEstoque)
        .input('CodTipoMovimentoEstoque', sql.Int, entity.CodTipoMovimentoEstoque)
        .input('ControlaLote', sql.VarChar(1), entity.ControlaLote)
        .input('ControlaSerie', sql.VarChar(1), entity.ControlaSerie)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      console.error('Erro em SqlServerExpedicaoTipoOperacaoArmazenagemRepository.actonEntity:', error.message);
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
