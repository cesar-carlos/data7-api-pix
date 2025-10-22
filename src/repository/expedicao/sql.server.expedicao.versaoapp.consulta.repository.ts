import fs from 'fs';
import path from 'path';

import { ConnectionPool } from 'mssql';
import { Params, Pagination, OrderBy } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoVersaoAppConsultaDto from '../../dto/expedicao/expedicao.versaoapp.consulta.dto';
import ParamsCommonRepository from '../common/params.common';

export default class LocalSqlServerExpedicaoVersaoAppConsultaRepository
  implements LocalBaseConsultaRepositoryContract<ExpedicaoVersaoAppConsultaDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(pagination: Pagination): Promise<ExpedicaoVersaoAppConsultaDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.versaoapp.consulta.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const sqlWithPagination = `${sql} ORDER BY (SELECT NULL) OFFSET ${pagination?.offset} ROWS FETCH NEXT ${pagination?.limit} ROWS ONLY`;
      const result = await pool.request().query(sqlWithPagination);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoVersaoAppConsultaDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(
    params: Params[] = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoVersaoAppConsultaDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.versaoapp.consulta.sql');
      const select = fs.readFileSync(patchSQL).toString();

      let _params: string = ParamsCommonRepository.build(params);

      const paramOrderBy =
        orderBy && orderBy.isValid() ? `ORDER BY ${orderBy.getFullOrderBy()}` : 'ORDER BY (SELECT NULL)';
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const sqlWithPagination = `${sql} ${paramOrderBy} OFFSET ${pagination?.offset} ROWS FETCH NEXT ${pagination?.limit} ROWS ONLY`;
      const sqlWithoutPagination = `${sql} ${paramOrderBy}`;
      const result = await pool.request().query(pagination ? sqlWithPagination : sqlWithoutPagination);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoVersaoAppConsultaDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }
}
