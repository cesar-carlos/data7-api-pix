import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ItemLiberacaoBloqueioSituacaoDto from '../dto/item.liberacao.bloqueio.situacao.dto';

export default class LocalSqlServerItemLiberacaoBloqueioSituacaoRepository
  implements LocalBaseRepositoryContract<ItemLiberacaoBloqueioSituacaoDto>
{
  private connect = new ConnectionSqlServerMssql();
  constructor() {}

  async select(): Promise<ItemLiberacaoBloqueioSituacaoDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.select.sql');
    const select = fs.readFileSync(patch).toString();
    const resultRequest = await pool.request().query(select);
    pool.close();

    if (resultRequest.recordset.length === 0) return undefined;
    const situacoes = resultRequest.recordset.map((item: any) => {
      return ItemLiberacaoBloqueioSituacaoDto.fromObject(item);
    });

    return situacoes;
  }

  async selectWhere(params: params[]): Promise<ItemLiberacaoBloqueioSituacaoDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.select.sql');
    const select = fs.readFileSync(patch).toString();

    const _params = params
      .map((item: any) => {
        const _value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
        return `${item.key} = ${_value}`;
      })
      .join(' AND ');

    const sql = `${select} WHERE ${_params}`;
    const resultRequest = await pool.request().query(sql);
    pool.close();

    if (resultRequest.recordset.length === 0) return undefined;
    const situacoes = resultRequest.recordset.map((item: any) => {
      return ItemLiberacaoBloqueioSituacaoDto.fromObject(item);
    });

    return situacoes;
  }

  async insert(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async update(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.update.sql');
      const update = fs.readFileSync(patch).toString();
      this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async delete(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ItemLiberacaoBloqueioSituacaoDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Item', sql.VarChar(3), entity.item.substring(0, 3))
        .input('Status', sql.VarChar(3), entity.status.substring(0, 3))
        .input('RotinaLiberacao', sql.VarChar(20), entity.rotinaLiberacao.substring(0, 20))
        .input('DataHoraLiberacao', sql.DateTime, entity.dataHoraLiberacao)
        .input('CodUsuarioLiberacao', sql.Int, entity.codUsuarioLiberacao)
        .input('EstacaoTrabalhoLiberacao', sql.VarChar(20), entity.estacaoTrabalhoLiberacao.substring(0, 20))
        .input('ObservacaoLiberacao', sql.VarChar(2000), entity.observacaoLiberacao.substring(0, 2000))
        .input('MotivoRejeicaoLiberacaoBloqueio', sql.VarChar(2000), entity.motivoRejeicaoLiberacaoBloqueio)
        .input('Complemento', sql.VarChar(2000), entity.complemento)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
