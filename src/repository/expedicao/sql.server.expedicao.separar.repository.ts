import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';

import ExpedicaoSepararEstoqueDto from '../../dto/expedicao/expedicao.separar.estoque.dto';
import ParamsCommonRepository from '../common.repository/params.common.repository';

export default class SqlServerExpedicaoSepararRepository
  implements LocalBaseRepositoryContract<ExpedicaoSepararEstoqueDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoSepararEstoqueDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoSepararEstoqueDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<ExpedicaoSepararEstoqueDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoSepararEstoqueDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: ExpedicaoSepararEstoqueDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoSepararEstoqueDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoSepararEstoqueDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoSepararEstoqueDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodSepararEstoque', sql.Int, entity.CodSepararEstoque)
        .input('CodTipoOperacaoExpedicao', sql.Int, entity.CodTipoOperacaoExpedicao)
        .input('TipoEntidade', sql.VarChar(5), entity.TipoEntidade)
        .input('CodEntidade', sql.Int, entity.CodEntidade)
        .input('NomeEntidade', sql.VarChar(100), entity.NomeEntidade)
        .input('Situacao', sql.VarChar(20), entity.Situacao)
        .input('Data', sql.Date, entity.Data)
        .input('Hora', sql.VarChar(5), entity.Hora)
        .input('CodPrioridade', sql.Int, entity.CodPrioridade)
        .input('Historico', sql.VarChar(50), entity.Historico)
        .input('Observacao', sql.VarChar(2000), entity.Observacao)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
