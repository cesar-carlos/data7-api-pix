import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import CobrancaDigitalPagamentoDto from '../dto/cobranca.digital.pagamento.dto';

export default class LocalSqlServerCobrancaDigitalPagamentoRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>
{
  private connect = new ConnectionSqlServerMssql();

  public async select(): Promise<CobrancaDigitalPagamentoDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pagamento.select.sql');
      const select = fs.readFileSync(patch).toString();
      const result = await pool.request().query(select);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalPagamentoDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalPagamentoDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pagamento.select.sql');
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
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalPagamentoDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalPagamentoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pagamento.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalPagamentoDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pagamento.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalPagamentoDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pagamento.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalPagamentoDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('SysId', sql.VarChar(500), entity.sysId)
        .input('Sequencia', sql.Int, entity.sequencia)
        .input('Status', sql.VarChar(1), entity.status)
        .input('EndToEndId', sql.VarChar(500), entity.endToEndId?.substring(0, 500))
        .input('Chave', sql.VarChar(100), entity.chave?.substring(0, 100))
        .input('DataPagamento', sql.Date, entity.dataPagamento)
        .input('Valor', sql.Money, entity.valor)
        .input('Observacao', sql.VarChar(2000), entity.observacao?.substring(0, 2000))
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
