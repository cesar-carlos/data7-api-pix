import fs from 'fs';
import path from 'path';

import sql, { ConnectionPool } from 'mssql';
import { Params } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import CobrancaDigitalDto from '../../dto/integracao/cobranca.digital.dto';
import ParamsCommonRepository from '../common/params.common';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';

export default class LocalSqlServerCobrancaDigitalRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalDto>
{
  private connect = ConnectionSqlServerMssql.getInstance();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('integracao');

  public async select(): Promise<CobrancaDigitalDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.select.sql');
      const select = fs.readFileSync(patchSQL).toString();
      const result = await pool.request().query(select);

      if (result.recordset.length === 0) return [];
      const chaves = result.recordset.map((item: any) => {
        return CobrancaDigitalDto.fromObject(item);
      });

      return chaves;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async selectWhere(params: Params[] = []): Promise<CobrancaDigitalDto[]> {
    const pool: ConnectionPool = await this.connect.getConnection();

    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.select.sql');
      const select = fs.readFileSync(patchSQL).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = _params ? `${select} WHERE ${_params}` : select;
      const result = await pool.request().query(sql);

      if (result.recordset.length === 0) return [];
      const chaves = result.recordset.map((item: any) => {
        return CobrancaDigitalDto.fromObject(item);
      });

      return chaves;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
    }
  }

  public async insert(entity: CobrancaDigitalDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(entity: CobrancaDigitalDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'cobranca.digital.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalDto, sqlCommand: string): Promise<void> {
    const pool: ConnectionPool = await this.connect.getConnection();
    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodFilial', sql.Int, entity.codFilial)
        .input('CodCobrancaDigital', sql.Int, entity.codCobrancaDigital)
        .input('BloqueioKey', sql.VarChar(500), entity.bloqueioKey)
        .input('Origem', sql.VarChar(6), entity.origem)
        .input('CodOrigem', sql.Int, entity.codOrigem)
        .input('Situacao', sql.VarChar(60), entity.situacao)
        .input('CodCliente', sql.Int, entity.codCliente)
        .input('NomeCliente', sql.VarChar(100), entity.nomeCliente)
        .input('CNPJ_CPF', sql.VarChar(20), entity.CNPJ_CPF)
        .input('Telefone', sql.VarChar(30), entity.telefone)
        .input('Email', sql.VarChar(500), entity.email)
        .input('Endereco', sql.VarChar(100), entity.endereco)
        .input('Numero', sql.VarChar(15), entity.numero)
        .input('Complemento', sql.VarChar(200), entity.complemento)
        .input('Bairro', sql.VarChar(60), entity.bairro)
        .input('CEP', sql.VarChar(10), entity.CEP)
        .input('CodigoMunicipio', sql.Int, entity.codigoMunicipio)
        .input('NomeMunicipio', sql.VarChar(60), entity.nomeMunicipio)
        .input('UFMunicipio', sql.VarChar(2), entity.UFMunicipio)
        .input('CodUsuario', sql.Int, entity.codUsuario)
        .input('NomeUsuario', sql.VarChar(20), entity.nomeUsuario)
        .input('EstacaoTrabalho', sql.VarChar(20), entity.estacaoTrabalho)
        .input('Ip', sql.VarChar(30), entity.ip)
        .query(sqlCommand);

      await transaction.commit();
    } catch (error: any) {
      transaction.rollback();
      throw new Error(error.message);
    } finally {
    }
  }
}
