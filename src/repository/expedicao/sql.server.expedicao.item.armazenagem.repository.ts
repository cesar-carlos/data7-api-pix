import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoItemArmazenagemDto from '../../dto/expedicao/expedicao.item.armazenagem.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoItemArmazenagemRepository
  implements LocalBaseRepositoryContract<ExpedicaoItemArmazenagemDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoItemArmazenagemDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenagem.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoItemArmazenagemDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoItemArmazenagemDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenagem.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoItemArmazenagemDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoItemArmazenagemDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenagem.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoItemArmazenagemDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenagem.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoItemArmazenagemDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.armazenagem.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoItemArmazenagemDto, sqlCommand: string): Promise<void> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodArmazenagem', sql.Int, entity.CodArmazenagem)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('CodCarrinhoPercurso', sql.Int, entity.CodCarrinhoPercurso)
        .input('ItemCarrinhoPercurso', sql.VarChar(5), entity.ItemCarrinhoPercurso)
        .input('CodLocalArmazenagem', sql.Int, entity.CodLocalArmazenagem)
        .input('CodSetorEstoque', sql.Int, entity.CodSetorEstoque)
        .input('CodProduto', sql.Int, entity.CodProduto)
        .input('NomeProduto', sql.VarChar(120), entity.NomeProduto)
        .input('CodUnidadeMedida', sql.VarChar(6), entity.CodUnidadeMedida)
        .input('CodigoBarras', sql.VarChar(30), entity.CodigoBarras)
        .input('CodProdutoEndereco', sql.VarChar(60), entity.CodProdutoEndereco)
        .input('Quantidade', sql.Float, entity.Quantidade)
        .input('QuantidadeArmazenada', sql.Float, entity.QuantidadeArmazenada)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }
}
