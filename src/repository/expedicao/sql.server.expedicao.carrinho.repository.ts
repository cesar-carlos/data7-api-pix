import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';

import ParamsCommonRepository from '../common.repository/params.common.repository';
import ExpedicaoCarrinhoDto from '../../dto/expedicao/expedicao.carrinho.dto';

export default class SqlServerExpedicaoCarrinhoRepository implements LocalBaseRepositoryContract<ExpedicaoCarrinhoDto> {
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoCarrinhoDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<ExpedicaoCarrinhoDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: ExpedicaoCarrinhoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoCarrinhoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoCarrinhoDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoCarrinhoDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodCarrinho', sql.Int, entity.CodCarrinho)
        .input('CodigoBarras', sql.VarChar(200), entity.CodigoBarras)
        .input('Descricao', sql.VarChar(100), entity.Descricao)
        .input('Situacao', sql.VarChar(20), entity.Situacao)
        .input('Ativo', sql.VarChar(1), entity.Ativo)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
