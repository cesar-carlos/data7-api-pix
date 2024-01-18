import fs from 'fs';
import path from 'path';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import EstoqueConversaoUnidadeConsultaDto from '../../dto/common.data/estoque.conversao.unidade.consulta.dto';
import ParamsCommonRepository from '../common/params.common';

export default class LocalSqlServerEstoqueConversaoUnidadeConsulta
  implements LocalBaseConsultaRepositoryContract<EstoqueConversaoUnidadeConsultaDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('common.data');

  public async select(page: pagination): Promise<EstoqueConversaoUnidadeConsultaDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'estoque.conversao.unidada.consulta.sql');
      const sql = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entity = result.recordset.map((item: any) => {
        return EstoqueConversaoUnidadeConsultaDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<EstoqueConversaoUnidadeConsultaDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'estoque.conversao.unidada.consulta.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const entitys = result.recordset.map((item: any) => {
        return EstoqueConversaoUnidadeConsultaDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}