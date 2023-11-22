import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoSepararRepository implements LocalBaseRepositoryContract<ExpedicaoSepararDto> {
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoSepararDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoSepararDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoSepararDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoSepararDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: ExpedicaoSepararDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoSepararDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoSepararDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.separar.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoSepararDto, sqlCommand: string): Promise<void> {
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
        .input('Hora', sql.VarChar(8), entity.Hora)
        .input('CodPrioridade', sql.Int, entity.CodPrioridade)
        .input('Historico', sql.VarChar(50), entity.Historico)
        .input('Observacao', sql.VarChar(2000), entity.Observacao)
        .input('CodMotivoCancelamento', sql.Int, entity.CodMotivoCancelamento)
        .input('DataCancelamento', sql.Date, entity.DataCancelamento)
        .input('HoraCancelamento', sql.VarChar(8), entity.HoraCancelamento)
        .input('CodUsuarioCancelamento', sql.Int, entity.CodUsuarioCancelamento)
        .input('NomeUsuarioCancelamento', sql.VarChar(30), entity.NomeUsuarioCancelamento)
        .input('ObservacaoCancelamento', sql.VarChar(2000), entity.ObservacaoCancelamento)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}