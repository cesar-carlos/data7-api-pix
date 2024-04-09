import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalSqlServerItemLiberacaoBloqueioRepository from './local.sql.server.item.liberacao.bloqueio.repository';
import LocalSqlServerItemLiberacaoBloqueioSituacaoRepository from './local.sql.server.item.liberacao.bloqueio.situacao.repository';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ParamsCommonRepository from '../common/params.common';
import LiberacaoBloqueioDto from '../../dto/common.data/liberacao.bloqueio.dto';

export default class LocalSqlServerLiberacaoBloqueioRepository
  implements LocalBaseRepositoryContract<LiberacaoBloqueioDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private itemLiberacaoBloqueioRepository = new LocalSqlServerItemLiberacaoBloqueioRepository();
  private itemLiberacaoBloqueioSituacaoRepository = new LocalSqlServerItemLiberacaoBloqueioSituacaoRepository();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('common.data');

  public async select(): Promise<LiberacaoBloqueioDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'liberacao.bloqueio.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(select);

      if (result.recordset?.length === 0) return [];
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
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(params: params[]): Promise<LiberacaoBloqueioDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'liberacao.bloqueio.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);

      if (result.recordset?.length === 0) return [];
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
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'liberacao.bloqueio.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);

      entity.itemLiberacaoBloqueio.map(async (item) => {
        await this.itemLiberacaoBloqueioRepository.insert(item);
      });

      entity.itemLiberacaoBloqueioSituacao?.map(async (item) => {
        await this.itemLiberacaoBloqueioSituacaoRepository.insert(item);
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'liberacao.bloqueio.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);

      entity.itemLiberacaoBloqueio?.map(async (item) => {
        await this.itemLiberacaoBloqueioRepository.update(item);
      });

      entity.itemLiberacaoBloqueioSituacao?.map(async (item) => {
        await this.itemLiberacaoBloqueioSituacaoRepository.update(item);
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: LiberacaoBloqueioDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'liberacao.bloqueio.delete.sql');
      const delet = fs.readFileSync(patchSQL).toString();

      for (const itemLiberacao of entity.itemLiberacaoBloqueio) {
        await this.itemLiberacaoBloqueioRepository.delete(itemLiberacao);
      }

      await this.actonEntity(entity, delet);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private async actonEntity(entity: LiberacaoBloqueioDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
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
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
