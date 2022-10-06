import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import CobrancaDigitalConfigDto from '../dto/cobranca.digital.config.dto';

export default class LocalSybaseCobrancaDigitalConfigRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalConfigDto>
{
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<CobrancaDigitalConfigDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.config.select.sql');
    const select = fs.readFileSync(patch).toString();
    const result = await pool.request().query(select);
    pool.close();

    if (result.length === 0) return undefined;
    const configs = result.map((item: any) => {
      return CobrancaDigitalConfigDto.fromObject(item);
    });

    return configs;
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalConfigDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.config.select.sql');
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

    if (result.length === 0) return undefined;
    const configs = result.map((item: any) => {
      return CobrancaDigitalConfigDto.fromObject(item);
    });

    return configs;
  }

  public async insert(entity: CobrancaDigitalConfigDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.config.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalConfigDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.config.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalConfigDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.config.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalConfigDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodConfiguracao', sql.Int, entity.codConfiguracao)
        .input('Ativo', sql.VarChar(1), entity.ativo)
        .input('Gerenciadora', sql.VarChar(60), entity.gerenciadora)
        .input('ClientId', sql.VarChar(255), entity.clientId)
        .input('ClientSecret', sql.VarChar(255), entity.clientSecret)
        .input('Certificado', sql.VarBinary(), Buffer.from(entity.certificado, 'binary').toString('base64'))
        .query(sqlCommand);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
