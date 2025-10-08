import fs from 'fs';
import path from 'path';

import { ConnectionPool } from 'mssql';
import { Params, Pagination, OrderBy } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoProgressoSeparacaoConsultaDto from '../../dto/expedicao/expedicao.progresso.separacao.consulta.dto';
import ParamsCommonRepository from '../common/params.common';

export default class SqlServerExpedicaoProgressoSeparacaoConsultaRepository
  implements LocalBaseConsultaRepositoryContract<ExpedicaoProgressoSeparacaoConsultaDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('expedicao');

  public async select(pagination?: Pagination): Promise<ExpedicaoProgressoSeparacaoConsultaDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.progresso.separacao.consulta.sql');
      const select = fs.readFileSync(patchSQL).toString();

      // Aplicar paginação se fornecida
      let sql = select;
      if (pagination) {
        const paramOrderBy = 'ORDER BY CodEmpresa, CodSepararEstoque';
        const sqlWithPagination = `${select} ${paramOrderBy} OFFSET ${pagination.offset} ROWS FETCH NEXT ${pagination.limit} ROWS ONLY`;
        sql = sqlWithPagination;
      }

      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return ExpedicaoProgressoSeparacaoConsultaDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(
    params: Params[] = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoProgressoSeparacaoConsultaDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'expedicao.progresso.separacao.consulta.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const paramOrderBy =
        orderBy && orderBy.isValid() ? `ORDER BY ${orderBy.getFullOrderBy()}` : 'ORDER BY (SELECT NULL)';
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const sqlWithPagination = `${sql} ${paramOrderBy} OFFSET ${pagination?.offset} ROWS FETCH NEXT ${pagination?.limit} ROWS ONLY`;
      const sqlWithoutPagination = `${sql} ${paramOrderBy}`;
      const result = await pool.request().query(pagination ? sqlWithPagination : sqlWithoutPagination);

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return ExpedicaoProgressoSeparacaoConsultaDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
