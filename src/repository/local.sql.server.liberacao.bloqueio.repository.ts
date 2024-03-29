import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import LiberacaoBloqueioDto from '../dto/liberacao.bloqueio.dto';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';

import LocalSqlServerItemLiberacaoBloqueioRepository from './local.sql.server.item.liberacao.bloqueio.repository';
import LocalSqlServerItemLiberacaoBloqueioSituacaoRepository from './local.sql.server.item.liberacao.bloqueio.situacao.repository';

export default class LocalSqlServerLiberacaoBloqueioRepository
  implements LocalBaseRepositoryContract<LiberacaoBloqueioDto>
{
  private connect = new ConnectionSqlServerMssql();
  private itemLiberacaoBloqueioRepository = new LocalSqlServerItemLiberacaoBloqueioRepository();
  private itemLiberacaoBloqueioSituacaoRepository = new LocalSqlServerItemLiberacaoBloqueioSituacaoRepository();

  public async select(): Promise<LiberacaoBloqueioDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.select.sql');
    const select = fs.readFileSync(patch).toString();
    const result = await pool.request().query(select);
    pool.close();

    if (result.recordset?.length === 0) return undefined;
    const liberacoes: LiberacaoBloqueioDto[] = [];
    for (const item of result.recordset) {
      const params = [{ key: 'CodLiberacaoBloqueio', value: item.CodLiberacaoBloqueio }];
      const itemLiberacaoBloqueio = await this.itemLiberacaoBloqueioRepository.selectWhere(params);
      const itemLiberacaoBloqueioSituacao = await this.itemLiberacaoBloqueioSituacaoRepository.selectWhere(params);

      const liberacao = new LiberacaoBloqueioDto({
        codEmpresa: item.codEmpresa,
        codFilial: item.Codfilial,
        codLiberacaoBloqueio: item.CodLiberacaoBloqueio,
        origem: item.Origem,
        codOrigem: item.CodOrigem,
        codCliente: item.CodCliente,
        dataHoraBloqueio: item.DataHoraBloqueio,
        codUsuarioBloqueio: item.CodUsuarioBloqueio,
        nomeUsuarioBloqueio: item.NomeUsuarioBloqueio,
        estacaoTrabalhoBloqueio: item.EstacaoTrabalhoBloqueio,
        itemLiberacaoBloqueio: itemLiberacaoBloqueio ? itemLiberacaoBloqueio : [],
        itemLiberacaoBloqueioSituacao: itemLiberacaoBloqueioSituacao ? itemLiberacaoBloqueioSituacao : [],
      });

      liberacoes.push(liberacao);
    }

    return liberacoes;
  }

  public async selectWhere(params: params[]): Promise<LiberacaoBloqueioDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.select.sql');
    const select = fs.readFileSync(patch).toString();
    const _params = this.buildParams(params);
    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset?.length === 0) return undefined;
    const liberacoes: LiberacaoBloqueioDto[] = [];

    for (const item of result.recordset) {
      const params = [{ key: 'CodLiberacaoBloqueio', value: item.CodLiberacaoBloqueio }];
      const itemLiberacaoBloqueio = await this.itemLiberacaoBloqueioRepository.selectWhere(params);
      const itemLiberacaoBloqueioSituacao = await this.itemLiberacaoBloqueioSituacaoRepository.selectWhere(params);

      const liberacao = new LiberacaoBloqueioDto({
        codEmpresa: item.CodEmpresa,
        codFilial: item.CodFilial,
        codLiberacaoBloqueio: item.CodLiberacaoBloqueio,
        origem: item.Origem,
        codOrigem: item.CodOrigem,
        codCliente: item.CodCliente,
        dataHoraBloqueio: item.DataHoraBloqueio,
        codUsuarioBloqueio: item.CodUsuarioBloqueio,
        nomeUsuarioBloqueio: item.NomeUsuarioBloqueio,
        estacaoTrabalhoBloqueio: item.EstacaoTrabalhoBloqueio,
        itemLiberacaoBloqueio: itemLiberacaoBloqueio ? itemLiberacaoBloqueio : [],
        itemLiberacaoBloqueioSituacao: itemLiberacaoBloqueioSituacao ? itemLiberacaoBloqueioSituacao : [],
      });

      liberacoes.push(liberacao);
    }

    return liberacoes;
  }

  public async insert(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);

      entity.itemLiberacaoBloqueio.map(async (item) => {
        await this.itemLiberacaoBloqueioRepository.insert(item);
      });

      entity.itemLiberacaoBloqueioSituacao?.map(async (item) => {
        await this.itemLiberacaoBloqueioSituacaoRepository.insert(item);
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);

      entity.itemLiberacaoBloqueio.map(async (item) => {
        await this.itemLiberacaoBloqueioRepository.update(item);
      });

      entity.itemLiberacaoBloqueioSituacao?.map(async (item) => {
        await this.itemLiberacaoBloqueioSituacaoRepository.update(item);
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'liberacao.bloqueio.delete.sql');
      const delet = fs.readFileSync(patch).toString();

      entity.itemLiberacaoBloqueio.map(async (item) => {
        await this.itemLiberacaoBloqueioRepository.delete(item);
      });

      entity.itemLiberacaoBloqueioSituacao?.map(async (item) => {
        await this.itemLiberacaoBloqueioSituacaoRepository.delete(item);
      });

      await this.actonEntity(entity, delet);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private buildParams(params: params[]): string {
    return params
      .map((item: any) => {
        const value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
        return `${item.key} = ${value}`;
      })
      .join(' AND ');
  }

  private async actonEntity(entity: LiberacaoBloqueioDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodFilial', sql.Int, entity.codFilial)
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Origem', sql.VarChar(6), entity.origem.substring(0, 6))
        .input('CodOrigem', sql.Int, entity.codOrigem)
        .input('CodCliente', sql.Int, entity.codCliente)
        .input('DataHoraBloqueio', sql.DateTime, entity.dataHoraBloqueio)
        .input('CodUsuarioBloqueio', sql.Int, entity.codUsuarioBloqueio)
        .input('NomeUsuarioBloqueio', sql.VarChar(30), entity.nomeUsuarioBloqueio.substring(0, 20))
        .input('EstacaoTrabalhoBloqueio', sql.VarChar(30), entity.estacaoTrabalhoBloqueio.substring(0, 20))
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
