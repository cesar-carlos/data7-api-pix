import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';

import ExpedicaoSepararEstoqueDto from '../../dto/expedicao/expedicao.separar.estoque.dto';
import ParamsCommonRepository from '../common.repository/params.common.repository';
import ExpedicaoItemSepararEstoqueDto from '../../dto/expedicao/expedicao.item.separar.estoque.dto';

export default class SqlServerExpedicaoItemSepararRepository
  implements LocalBaseRepositoryContract<ExpedicaoItemSepararEstoqueDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoItemSepararEstoqueDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoItemSepararEstoqueDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<ExpedicaoItemSepararEstoqueDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoItemSepararEstoqueDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: ExpedicaoItemSepararEstoqueDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoItemSepararEstoqueDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoItemSepararEstoqueDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoItemSepararEstoqueDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodSepararEstoque', sql.Int, entity.CodSepararEstoque)
        .input('Item', sql.VarChar(5), entity.Item)
        .input('CodSetorEstoque', sql.Int, entity.CodSetorEstoque)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('CodOrigem', sql.Int, entity.CodOrigem)
        .input('ItemOrigem', sql.VarChar(5), entity.ItemOrigem)
        .input('CodLocaArmazenagem', sql.Int, entity.CodLocaArmazenagem)
        .input('CodProduto', sql.Int, entity.CodProduto)
        .input('CodUnidadeMedida', sql.VarChar(6), entity.CodUnidadeMedida)
        .input('Quantidade', sql.Float, entity.Quantidade)
        .input('QuantidadeInterna', sql.Float, entity.QuantidadeInterna)
        .input('QuantidadeExterna', sql.Float, entity.QuantidadeExterna)
        .input('QuantidadeSeparacao', sql.Float, entity.QuantidadeSeparacao)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
