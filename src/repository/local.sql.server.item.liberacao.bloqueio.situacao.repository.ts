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

    const result = await pool.request().query(select);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const situacoes = result.recordset.map((item: any) => {
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
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const situacoes = result.recordset.map((item: any) => {
      return ItemLiberacaoBloqueioSituacaoDto.fromObject(item);
    });

    return situacoes;
  }

  async insert(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.insert.sql');
      const insert = fs.readFileSync(patch).toString();

      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Item', sql.VarChar(3), entity.item)
        .input('Status', sql.VarChar(3), entity.status)
        .input('RotinaLiberacao', sql.VarChar(20), entity.rotinaLiberacao)
        .input('DataHoraLiberacao', sql.DateTime, entity.dataHoraLiberacao)
        .input('CodUsuarioLiberacao', sql.Int, entity.codUsuarioLiberacao)
        .input('EstacaoTrabalhoLiberacao', sql.VarChar(20), entity.estacaoTrabalhoLiberacao)
        .input('ObservacaoLiberacao', sql.VarChar(2000), entity.observacaoLiberacao)
        .input('MotivoRejeicaoLiberacaoBloqueio', sql.VarChar(2000), entity.motivoRejeicaoLiberacaoBloqueio)
        .input('Complemento', sql.VarChar(2000), entity.complemento)
        .query(insert);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async update(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.update.sql');
      const update = fs.readFileSync(patch).toString();

      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Item', sql.VarChar(3), entity.item)
        .input('Status', sql.VarChar(3), entity.status)
        .input('RotinaLiberacao', sql.VarChar(20), entity.rotinaLiberacao.substring(0, 20))
        .input('DataHoraLiberacao', sql.DateTime, entity.dataHoraLiberacao)
        .input('CodUsuarioLiberacao', sql.Int, entity.codUsuarioLiberacao)
        .input('EstacaoTrabalhoLiberacao', sql.VarChar(20), entity.estacaoTrabalhoLiberacao.substring(0, 20))
        .input('ObservacaoLiberacao', sql.VarChar(2000), entity.observacaoLiberacao)
        .input('MotivoRejeicaoLiberacaoBloqueio', sql.VarChar(2000), entity.motivoRejeicaoLiberacaoBloqueio)
        .input('Complemento', sql.VarChar(2000), entity.complemento)
        .query(update);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  //todo: implementar
  async delete(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.situacao.delete.sql');
    const delet = fs.readFileSync(patch).toString();

    pool.close();
    throw new Error('Method not implemented.');
  }
}
