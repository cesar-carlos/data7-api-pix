import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';

import ParamsCommonRepository from '../common.repository/params.common.repository';
import ExpedicaoItemSeparacaoEstoqueDto from '../../dto/expedicao/expedicao.item.separacao.estoque.dto';

export default class SqlServerExpedicaoItemSeparacaoRepository
  implements LocalBaseRepositoryContract<ExpedicaoItemSeparacaoEstoqueDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoItemSeparacaoEstoqueDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separaracao.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoItemSeparacaoEstoqueDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<ExpedicaoItemSeparacaoEstoqueDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separaracao.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoItemSeparacaoEstoqueDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: ExpedicaoItemSeparacaoEstoqueDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separaracao.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoItemSeparacaoEstoqueDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separaracao.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoItemSeparacaoEstoqueDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separaracao.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoItemSeparacaoEstoqueDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodSepararEstoque', sql.Int, entity.CodSepararEstoque)
        .input('Item', sql.Int, entity.Item)
        .input('SessionId', sql.VarChar(1000), entity.SessionId)
        .input('CodCarrinho', sql.Int, entity.CodCarrinho)
        .input('CodSeparador', sql.Int, entity.CodSeparador)
        .input('NomeSeparador', sql.VarChar(100), entity.NomeSeparador)
        .input('DataSeparacao', sql.Date, entity.DataSeparacao)
        .input('HoraSeparacao', sql.VarChar(5), entity.HoraSeparacao)
        .input('CodProduto', sql.Int, entity.CodProduto)
        .input('CodUnidadeMedida', sql.VarChar(6), entity.CodUnidadeMedida)
        .input('Quantidade', sql.Float, entity.Quantidade)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
