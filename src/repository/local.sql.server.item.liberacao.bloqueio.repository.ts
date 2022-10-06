import path from 'path';
import fs from 'fs';
import sql from 'mssql';

import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ItemLiberacaoBloqueioDto from '../dto/item.liberacao.bloqueio.dto';

export default class LocalSqlServerItemLiberacaoBloqueioRepository
  implements LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>
{
  constructor() {}
  private connect = new ConnectionSqlServerMssql();
  async select(): Promise<ItemLiberacaoBloqueioDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.select.sql');
    const sql = fs.readFileSync(patch).toString();

    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const itensLiberacoes = result.recordset.map((item: any) => {
      return ItemLiberacaoBloqueioDto.fromObject(item);
    });

    return itensLiberacoes;
  }

  async selectWhere(params: params[]): Promise<ItemLiberacaoBloqueioDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.select.sql');
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
    const itensLiberacoes = result.recordset.map((item: any) => {
      return ItemLiberacaoBloqueioDto.fromObject(item);
    });

    return itensLiberacoes;
  }

  async insert(entity: ItemLiberacaoBloqueioDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async update(entity: ItemLiberacaoBloqueioDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async delete(entity: ItemLiberacaoBloqueioDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'item.liberacao.bloqueio.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: ItemLiberacaoBloqueioDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Item', sql.VarChar(3), entity.item)
        .input('Status', sql.VarChar(1), entity.status.substring(0, 1))
        .input('CodRegra', sql.Int, entity.codRegra)
        .input('Regra', sql.VarChar(30), entity.regra)
        .input('MensagemBloqueio', sql.VarChar(200), entity.mensagemBloqueio.substring(0, 200))
        .input('DescricaoBloqueio', sql.VarChar(200), entity.descricaoBloqueio.substring(0, 200))
        .input('ObservacaoBloqueio', sql.VarChar(2000), entity.observacaoBloqueio.substring(0, 2000))
        .input('DataHoraSolicitacao', sql.DateTime, entity.dataHoraSolicitacao)
        .input('CodUsuarioSolicitacao', sql.Int, entity.codUsuarioSolicitacao)
        .input('NomeUsuarioSolicitacao', sql.VarChar(20), entity.nomeUsuarioSolicitacao.substring(0, 20))
        .input('EstacaoTrabalhoSolicitacao', sql.VarChar(20), entity.estacaoTrabalhoSolicitacao.substring(0, 20))
        .input('ObservacaoLiberacaoBloqueio', sql.VarChar(2000), entity.observacaoLiberacaoBloqueio.substring(0, 2000))
        .input(
          'MotivoRejeicaoLiberacaoBloqueio',
          sql.VarChar(2000),
          entity.motivoRejeicaoLiberacaoBloqueio.substring(0, 2000),
        )
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
