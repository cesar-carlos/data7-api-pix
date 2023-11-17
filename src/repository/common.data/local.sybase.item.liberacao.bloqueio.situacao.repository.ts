import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../../infra/connection.sybase';
import { params, pagination } from '../../contracts/local.base.params';

import ItemLiberacaoBloqueioSituacaoDto from '../../dto/common.data/item.liberacao.bloqueio.situacao.dto';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ParamsCommonRepository from '../common/params.common';

export default class LocalSybaseItemLiberacaoBloqueioSituacaoRepository
  implements LocalBaseRepositoryContract<ItemLiberacaoBloqueioSituacaoDto>
{
  private connect = new ConnectionSybase();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('common.data');

  async select(): Promise<ItemLiberacaoBloqueioSituacaoDto[]> {
    const pool = await (await this.connect.getConnection()).connect();
    const patchSQL = path.resolve(this.basePatchSQL, 'item.liberacao.bloqueio.situacao.select.sql');
    const sql = fs.readFileSync(patchSQL).toString();
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return [];
    const situacoes = result.map((item: any) => {
      return ItemLiberacaoBloqueioSituacaoDto.fromObject(item);
    });

    return situacoes;
  }

  async selectWhere(params: params[]): Promise<ItemLiberacaoBloqueioSituacaoDto[]> {
    const pool = await (await this.connect.getConnection()).connect();
    const patchSQL = path.resolve(this.basePatchSQL, 'item.liberacao.bloqueio.situacao.select.sql');
    const select = fs.readFileSync(patchSQL).toString();

    const _params = ParamsCommonRepository.build(params);
    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return [];
    const situacoes = result.map((item: any) => {
      return ItemLiberacaoBloqueioSituacaoDto.fromObject(item);
    });

    return situacoes;
  }

  async insert(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async update(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'item.liberacao.bloqueio.situacao.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(entity: ItemLiberacaoBloqueioSituacaoDto): Promise<void> {
    this.update(this.resetSituacao(entity));
  }

  private async actonEntity(entity: ItemLiberacaoBloqueioSituacaoDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      await transaction
        .request()
        .input('CodLiberacaoBloqueio', sql.Int, entity.codLiberacaoBloqueio)
        .input('Item', sql.VarChar(3), entity.item.substring(0, 3))
        .input('Status', sql.VarChar(3), entity.status.substring(0, 3))
        .input('RotinaLiberacao', sql.VarChar(20), entity.rotinaLiberacao?.substring(0, 20))
        .input('DataHoraLiberacao', sql.DateTime, entity.dataHoraLiberacao)
        .input('CodUsuarioLiberacao', sql.Int, entity.codUsuarioLiberacao)
        .input('EstacaoTrabalhoLiberacao', sql.VarChar(20), entity.estacaoTrabalhoLiberacao?.substring(0, 20))
        .input('ObservacaoLiberacao', sql.VarChar(2000), entity.observacaoLiberacao?.substring(0, 2000))
        .input('MotivoRejeicaoLiberacaoBloqueio', sql.VarChar(2000), entity.motivoRejeicaoLiberacaoBloqueio)
        .input('Complemento', sql.VarChar(2000), entity.complemento)
        .query(sqlCommand);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      pool.close();
    }
  }

  private resetSituacao(delSituacao: ItemLiberacaoBloqueioSituacaoDto): ItemLiberacaoBloqueioSituacaoDto {
    return new ItemLiberacaoBloqueioSituacaoDto({
      codLiberacaoBloqueio: delSituacao.codLiberacaoBloqueio,
      item: delSituacao.item,
      status: 'B',
      rotinaLiberacao: undefined,
      dataHoraLiberacao: undefined,
      codUsuarioLiberacao: undefined,
      estacaoTrabalhoLiberacao: undefined,
      observacaoLiberacao: undefined,
      motivoRejeicaoLiberacaoBloqueio: undefined,
      complemento: undefined,
    });
  }
}
