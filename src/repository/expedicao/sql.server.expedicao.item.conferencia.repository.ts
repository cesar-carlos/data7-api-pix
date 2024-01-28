import fs from 'fs';
import path from 'path';
import sql, { ConnectionPool } from 'mssql';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import ExpedicaoItemConferenciaDto from '../../dto/expedicao/expedicao.item.conferencia.dto';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoItemConferenciaRepository
  implements LocalBaseRepositoryContract<ExpedicaoItemConferenciaDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoItemConferenciaDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.conferencia.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoItemConferenciaDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoItemConferenciaDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.conferencia.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoItemConferenciaDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
    }
  }

  public async insert(entity: ExpedicaoItemConferenciaDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.conferencia.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoItemConferenciaDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.conferencia.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoItemConferenciaDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.conferencia.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoItemConferenciaDto, sqlCommand: string): Promise<void> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodConferir', sql.Int, entity.CodConferir)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('SessionId', sql.VarChar(1000), entity.SessionId)
        .input('Situacao', sql.VarChar(30), entity.Situacao)
        .input('CodCarrinhoPercurso', sql.Int, entity.CodCarrinhoPercurso)
        .input('ItemCarrinhoPercurso', sql.VarChar(5), entity.ItemCarrinhoPercurso)
        .input('CodConferente', sql.Int, entity.CodConferente)
        .input('NomeConferente', sql.VarChar(30), entity.NomeConferente)
        .input('DataConferencia', sql.Date, entity.DataConferencia)
        .input('HoraConferencia', sql.VarChar(8), entity.HoraConferencia)
        .input('CodProduto', sql.Int, entity.CodProduto)
        .input('CodUnidadeMedida', sql.VarChar(6), entity.CodUnidadeMedida)
        .input('Quantidade', sql.Float, entity.Quantidade)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
    }
  }
}
