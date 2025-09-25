import path from 'path';
import fs from 'fs';

import sql, { ConnectionPool } from 'mssql';
import { Params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import ProcessoExecutavelDto from '../../dto/common.data/processo.executavel.dto';
import ParamsCommonRepository from '../common/params.common';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';

export default class LocalSqlServerProcessoExecutavelRepository
  implements LocalBaseRepositoryContract<ProcessoExecutavelDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('common.data');

  async select(): Promise<ProcessoExecutavelDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'processo.executavel.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const itensLiberacoes = result.recordset.map((item: any) => {
        return ProcessoExecutavelDto.fromObject(item);
      });

      return itensLiberacoes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async selectWhere(params: Params[]): Promise<ProcessoExecutavelDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'processo.executavel.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const itensLiberacoes = result.recordset.map((item: any) => {
        return ProcessoExecutavelDto.fromObject(item);
      });

      return itensLiberacoes;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  async insert(entity: ProcessoExecutavelDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'processo.executavel.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(entity: ProcessoExecutavelDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'processo.executavel.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(entity: ProcessoExecutavelDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'processo.executavel.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ProcessoExecutavelDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodProcessoExecutavel', sql.BigInt, entity.CodProcessoExecutavel)
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodFilial', sql.Int, entity.CodFilial)
        .input('Status', sql.VarChar(15), entity.Status)
        .input('Contexto', sql.VarChar(20), entity.Contexto)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('CodOrigem', sql.Int, entity.CodOrigem)
        .input('ItemOrigem', sql.VarChar(5), entity.ItemOrigem)
        .input('DataAbertura', sql.DateTime, entity.DataAbertura)
        .input('CodUsuario', sql.Int, entity.CodUsuario)
        .input('NomeUsuario', sql.VarChar(30), entity.NomeUsuario)
        .input('CodContaFinanceira', sql.VarChar(6), entity.CodContaFinanceira)
        .input('CodPeriodoCaixa', sql.Int, entity.CodPeriodoCaixa)
        .input('StatusPeriodoCaixa', sql.VarChar(30), entity.StatusPeriodoCaixa)
        .input('UsuarioWindows', sql.VarChar(30), entity.UsuarioWindows)
        .input('NomeComputador', sql.VarChar(30), entity.NomeComputador)
        .input('BancoDados', sql.VarChar(60), entity.BancoDados)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
