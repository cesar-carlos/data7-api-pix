import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoArmazenagemDto from '../../dto/expedicao/expedicao.armazenagem.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoArmazenagemRepository
  implements LocalBaseRepositoryContract<ExpedicaoArmazenagemDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(): Promise<ExpedicaoArmazenagemDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.armazenagem.select.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoArmazenagemDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoArmazenagemDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.armazenagem.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoArmazenagemDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: ExpedicaoArmazenagemDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.armazenagem.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: ExpedicaoArmazenagemDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.armazenagem.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: ExpedicaoArmazenagemDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.armazenagem.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ExpedicaoArmazenagemDto, sqlCommand: string): Promise<void> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.CodEmpresa)
        .input('CodArmazenagem', sql.Int, entity.CodArmazenagem)
        .input('NumeroDocumento', sql.VarChar(60), entity.NumeroDocumento)
        .input('Situacao', sql.VarChar(30), entity.Situacao)
        .input('Origem', sql.VarChar(6), entity.Origem)
        .input('CodOrigem', sql.Int, entity.CodOrigem)
        .input('CodPrioridade', sql.Int, entity.CodPrioridade)
        .input('DataLancamento', sql.Date, entity.DataLancamento)
        .input('HoraLancamento', sql.VarChar(8), entity.DataLancamento)
        .input('CodUsuarioLancamento', sql.Int, entity.DataLancamento)
        .input('NomeUsuarioLancamento', sql.VarChar(30), entity.DataLancamento)
        .input('EstacaoLancamento', sql.VarChar(30), entity.EstacaoLancamento)
        .input('Observacao', sql.VarChar(2000), entity.Observacao)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }
}
