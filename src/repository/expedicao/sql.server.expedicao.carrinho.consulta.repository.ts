import fs from 'fs';
import path from 'path';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoCarrinhoConsultaDto from '../../dto/expedicao/expedicao.carrinho.consulta.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoCarrinhoConsultaRepository
  implements LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConsultaDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(page: pagination): Promise<ExpedicaoCarrinhoConsultaDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.consulta.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoConsultaDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCarrinhoConsultaDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.carrinho.consulta.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoCarrinhoConsultaDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}