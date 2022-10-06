import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';

export default class LocalSqlServerCobrancaDigitalTituloRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalTituloDto>
{
  private connect = new ConnectionSqlServerMssql();

  public async select(): Promise<CobrancaDigitalTituloDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return undefined;
      const entity = result.recordset.map((item: any) => {
        return CobrancaDigitalTituloDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalTituloDto[] | undefined> {
    try {
      const pool = await this.connect.getConnection();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.select.sql');
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
      const entitys = result.recordset.map((item: any) => {
        return CobrancaDigitalTituloDto.fromObject(item);
      });

      return entitys;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalTituloDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalTituloDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalTituloDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalTituloDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodCobrancaDigital', sql.Int, entity.codCobrancaDigital)
        .input('Item', sql.VarChar(3), entity.item)
        .input('SysId', sql.VarChar(500), entity.sysId?.substring(0, 500))
        .input('Status', sql.VarChar(6), entity.status?.substring(0, 6))
        .input('TipoCobranca', sql.VarChar(30), entity.tipoCobranca?.substring(0, 30))
        .input('NumeroTitulo', sql.VarChar(50), entity.numeroTitulo?.substring(0, 50))
        .input('Parcela', sql.VarChar(10), entity.parcela?.substring(0, 10))
        .input('QtdParcelas', sql.Int, entity.qtdParcelas)
        .input('LiberacaoKey', sql.VarChar(500), entity.liberacaoKey?.substring(0, 500))
        .input('DataLancamento', sql.Date, entity.dataLancamento)
        .input('DataEmissao', sql.Date, entity.dataEmissao)
        .input('DataVenda', sql.Date, entity.dataVenda)
        .input('DataVencimento', sql.Date, entity.dataVencimento)
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
