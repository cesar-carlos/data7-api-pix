import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoItemArmazenarDto from '../../dto/expedicao/expedicao.item.armazenar.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoItemArmazenarRepository
  implements LocalBaseRepositoryContract<ExpedicaoItemArmazenarDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoItemArmazenarDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenar.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoItemArmazenarDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoItemArmazenarDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenar.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoItemArmazenarDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoItemArmazenarDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenar.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoItemArmazenarDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenar.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoItemArmazenarDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenar.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoItemArmazenarDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodArmazenar', sql.Int, entity.CodArmazenar)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('Situacao', sql.VarChar(30), entity.Situacao)
        .input('CodCarrinhoPercurso', sql.Int, entity.CodCarrinhoPercurso)
        .input('ItemCarrinhoPercurso', sql.VarChar(5), entity.ItemCarrinhoPercurso)
        .input('CodProduto', sql.Int, entity.CodProduto)
        .input('NomeProduto', sql.VarChar(120), entity.NomeProduto)
        .input('CodUnidadeMedida', sql.VarChar(6), entity.CodUnidadeMedida)
        .input('CodProdutoEndereco', sql.VarChar(60), entity.CodProdutoEndereco)
        .input('CodigoBarras', sql.VarChar(30), entity.CodigoBarras)
        .input('Quantidade', sql.Float, entity.Quantidade)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
