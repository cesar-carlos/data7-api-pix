import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import CobrancaDigitalPixDto from '../dto/cobranca.digital.pix.dto';
import ParamsCommonRepository from './common.repository/params.common.repository';

export default class LocalSybaseCobrancaDigitalPixRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalPixDto>
{
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<CobrancaDigitalPixDto[] | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pix.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const logs = result.map((item: any) => {
        return CobrancaDigitalPixDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalPixDto[] | undefined> {
    try {
      const pool = await (await this.connect.getConnection()).connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pix.select.sql');
      const select = fs.readFileSync(patch).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const logs = result.map((item: any) => {
        return CobrancaDigitalPixDto.fromObject(item);
      });

      return logs;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async insert(entity: CobrancaDigitalPixDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pix.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalPixDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pix.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalPixDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.pix.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalPixDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
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
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
