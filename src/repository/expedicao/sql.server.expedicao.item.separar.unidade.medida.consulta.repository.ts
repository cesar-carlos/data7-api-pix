import fs from 'fs';
import path from 'path';

import { ConnectionPool } from 'mssql';
import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSepararUnidadeMedidaConsultaDto from '../../dto/expedicao/expedicao.item.separar.unidade.medida.consulta.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoItemSepararUnidadeMedidaConsultaRepository
  implements LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararUnidadeMedidaConsultaDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(page: pagination): Promise<ExpedicaoItemSepararUnidadeMedidaConsultaDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.unidade.medida.consulta.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoItemSepararUnidadeMedidaConsultaDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoItemSepararUnidadeMedidaConsultaDto[]> {
    let pool: ConnectionPool | null = null;

    try {
      pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.item.separar.unidade.medida.consulta.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoItemSepararUnidadeMedidaConsultaDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      //if (pool) pool.close();
    }
  }
}
