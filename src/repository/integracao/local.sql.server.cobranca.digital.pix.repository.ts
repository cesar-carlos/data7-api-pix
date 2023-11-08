import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import CobrancaDigitalPixDto from '../../dto/integracao/cobranca.digital.pix.dto';
import ParamsCommonRepository from '../common.repository/params.common.repository';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';

export default class LocalSqlServerCobrancaDigitalPixRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalPixDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');

  public async select(): Promise<CobrancaDigitalPixDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.pix.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(select);
      pool.close();

      if (result.recordset.length === 0) return [];
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalPixDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async selectWhere(params: params[] | string = []): Promise<CobrancaDigitalPixDto[]> {
    try {
      const pool = await this.connect.getConnection();
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.pix.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.recordset.length === 0) return [];
      const logs = result.recordset.map((item: any) => {
        return CobrancaDigitalPixDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalPixDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.pix.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: CobrancaDigitalPixDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.pix.update.sql');
      const update = fs.readFileSync(patchSQL).toString();

      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalPixDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.pix.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalPixDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('SysId', sql.VarChar(500), entity.sysId)
        .input('Sequencia', sql.Int, entity.sequencia)
        .input('TxId', sql.VarChar(100), entity.txId)
        .input('DataCriacao', sql.Date, entity.dataCriacao)
        .input('DataExpiracao', sql.Date, entity.dataExpiracao)
        .input('QrCode', sql.VarChar(1000), entity.qrCode)
        .input('ImagemQrcode', sql.VarChar(8000), entity.imagemQrcode)
        .input('Valor', sql.Money, entity.valor)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
