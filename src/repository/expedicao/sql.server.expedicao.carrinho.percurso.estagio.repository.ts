import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import ParamsCommonRepository from '../common.repository/params.common.repository';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';

export default class SqlServerExpedicaoCarrinhoPercursoEstagioRepository
  implements LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoPercursoEstagioDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.percurso.estagio.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoPercursoEstagioDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
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
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodCarrinhoPercurso', sql.Int, entity.CodCarrinhoPercurso)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('Situacao', sql.VarChar(20), entity.Situacao)
        .input('DataInicio', sql.Date, entity.DataInicio)
        .input('HoraInicio', sql.VarChar(5), entity.HoraInicio)
        .input('DataFinalizacao', sql.Date, entity.DataFinalizacao)
        .input('HoraFinalizacao', sql.VarChar(5), entity.HoraFinalizacao)
        .input('CodUsuario', sql.Int, entity.CodUsuario)
        .input('NomeUsuario', sql.VarChar(20), entity.NomeUsuario)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
