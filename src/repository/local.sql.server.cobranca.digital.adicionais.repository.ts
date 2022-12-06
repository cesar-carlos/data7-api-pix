import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import CobrancaDigitalAdicionaisDto from '../dto/cobranca.digital.adicionais.dto';

export default class LocalSqlServerCobrancaDigitalAdicionaisRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalAdicionaisDto>
{
  private connect = new ConnectionSqlServerMssql();
  constructor() {}

  public async select(): Promise<CobrancaDigitalAdicionaisDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.adicionais.select.sql');
      const select = fs.readFileSync(patch).toString();
      const result = await pool.request().query(select);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalAdicionaisDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalAdicionaisDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.adicionais.select.sql');
      const select = fs.readFileSync(patch).toString();

      const _params = params
        .map((item: any) => {
          const _value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
          const _operator = item.operator ? item.operator : '=';
          return `${item.key} ${_operator} ${_value}`;
        })
        .join(' AND ');

      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalAdicionaisDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalAdicionaisDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.adicionais.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalAdicionaisDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.adicionais.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalAdicionaisDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.adicionais.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalAdicionaisDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodCobrancaDigital', sql.Int, entity.codCobrancaDigital)
        .input('Item', sql.VarChar(3), entity.item)
        .input('Sequencia', sql.Int, entity.sequencia)
        .input('Adicional', sql.VarChar(2000), entity.adicional)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
