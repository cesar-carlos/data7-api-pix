import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import CobrancaDigitalConfigDto from '../../dto/cobranca.digital.config.dto';
import ParamsCommonRepository from '../common.repository/params.common.repository';

export default class LocalSqlServerCobrancaDigitalConfigRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalConfigDto>
{
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');

  public async select(): Promise<CobrancaDigitalConfigDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.config.select.sql');
    const select = fs.readFileSync(patchSQL).toString();
    const result = await pool.request().query(select);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const configs = result.recordset.map((item: any) => {
      return CobrancaDigitalConfigDto.fromObject(item);
    });

    return configs;
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalConfigDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.config.select.sql');
    const select = fs.readFileSync(patchSQL).toString();

    const _params = ParamsCommonRepository.build(params);
    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const configs = result.recordset.map((item: any) => {
      return CobrancaDigitalConfigDto.fromObject(item);
    });

    return configs;
  }

  public async insert(entity: CobrancaDigitalConfigDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.config.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: CobrancaDigitalConfigDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.config.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalConfigDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.config.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalConfigDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodConfiguracao', sql.Int, entity.codConfiguracao)
        .input('Ativo', sql.VarChar(1), entity.ativo)
        .input('Gerenciadora', sql.VarChar(60), entity.gerenciadora)
        .input('ClientId', sql.VarChar(255), entity.clientId)
        .input('ClientSecret', sql.VarChar(255), entity.clientSecret)
        .input('Certificado', sql.VarBinary(), Buffer.from(entity.certificado, 'binary'))
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
