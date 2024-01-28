import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

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
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
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
      //if (pool) pool.close();
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoTipoOperacaoExpedicaoDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.tipo.operacao.expedicao.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoTipoOperacaoExpedicaoDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
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
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodTipoOperacaoExpedicao', sql.Int, entity.CodTipoOperacaoExpedicao)
        .input('Descricao', sql.VarChar(100), entity.Descricao)
        .input('Ativo', sql.VarChar(1), entity.Ativo)
        .input('Tipo', sql.VarChar(20), entity.Tipo)
        .input('CodRelatorio', sql.Int, entity.CodRelatorio)
        .input('CodLocalArmazenagem', sql.Int, entity.CodLocalArmazenagem)
        .input('MovimentaEstoque', sql.VarChar(1), entity.MovimentaEstoque)
        .input('CodTipoMovimentoEstoque', sql.Int, entity.CodTipoMovimentoEstoque)
        .input('ControlaLote', sql.VarChar(1), entity.ControlaLote)
        .input('ControlaNumeroSerie', sql.VarChar(1), entity.ControlaNumeroSerie)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
    }
  }
}
