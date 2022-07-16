import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { param, params } from '../contracts/local.base.repository.contract';
import LiberacaoBloqueioDto from '../dto/liberacao.bloqueio.dto';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';

export default class LocalSqlServerLiberacaoBloqueioRepository
  implements LocalBaseRepositoryContract<LiberacaoBloqueioDto>
{
  private connect = new ConnectionSqlServerMssql();
  constructor() {}

  public async select(): Promise<LiberacaoBloqueioDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.select.sql');
    const select = fs.readFileSync(patch).toString();

    const result = await pool.request().query(select);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const liberacoes = result.recordset.map((item: any) => {
      return LiberacaoBloqueioDto.fromObject(item);
    });

    return liberacoes;
  }

  public async selectWhere(params: params[]): Promise<LiberacaoBloqueioDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.select.sql');
    const select = fs.readFileSync(patch).toString();

    const _params = params
      .map((item: any) => {
        const _value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
        return `${item.key} = ${_value}`;
      })
      .join(' AND ');

    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const liberacoes = result.recordset.map((liberacao: any) => {
      return LiberacaoBloqueioDto.fromObject(liberacao);
    });

    return liberacoes;
  }

  public async insert(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.insert.sql');
      const insert = fs.readFileSync(patch).toString();

      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodFilial', sql.Int, entity.codFilial)
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Origem', sql.VarChar(6), entity.origem)
        .input('CodOrigem', sql.Int, entity.codOrigem)
        .input('DataHoraBloqueio', sql.DateTime, entity.dataHoraBloqueio)
        .input('CodUsuarioBloqueio', sql.Int, entity.CodUsuarioBloqueio)
        .input('NomeUsuarioBloqueio', sql.VarChar(20), entity.nomeUsuarioBloqueio)
        .input('EstacaoTrabalhoBloqueio', sql.VarChar(20), entity.estacaoTrabalhoBloqueio)
        .query(insert);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.update.sql');
      const update = fs.readFileSync(patch).toString();

      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodFilial', sql.Int, entity.codFilial)
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Origem', sql.VarChar(6), entity.origem)
        .input('CodOrigem', sql.Int, entity.codOrigem)
        .input('DataHoraBloqueio', sql.DateTime, entity.dataHoraBloqueio)
        .input('CodUsuarioBloqueio', sql.Int, entity.CodUsuarioBloqueio)
        .input('NomeUsuarioBloqueio', sql.VarChar(30), entity.nomeUsuarioBloqueio)
        .input('EstacaoTrabalhoBloqueio', sql.VarChar(30), entity.estacaoTrabalhoBloqueio)
        .query(update);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //todo: delete method
  public async delete(entity: LiberacaoBloqueioDto): Promise<void> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.delete.sql');
    const delet = fs.readFileSync(patch).toString();

    pool.close();
    throw new Error('Method not implemented.');
  }
}
