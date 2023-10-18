import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import CobrancaDigitalDto from '../dto/cobranca.digital.dto';
import ParamsCommonRepository from './common.repository/params.common.repository';

export default class LocalSybaseCobrancaDigitalRepository implements LocalBaseRepositoryContract<CobrancaDigitalDto> {
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<CobrancaDigitalDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.select.sql');
    const sql = fs.readFileSync(patch).toString();
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return undefined;
    const chaves = result.map((item: any) => {
      return CobrancaDigitalDto.fromObject(item);
    });

    return chaves;
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalDto[] | undefined> {
    const pool = await (await this.connect.getConnection()).connect();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.select.sql');
    const select = fs.readFileSync(patch).toString();

    const _params = ParamsCommonRepository.build(params);
    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.length === 0) return undefined;
    const chaves = result.map((item: any) => {
      return CobrancaDigitalDto.fromObject(item);
    });

    return chaves;
  }

  public async insert(entity: CobrancaDigitalDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.insert.sql');
      const insert = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async update(entity: CobrancaDigitalDto): Promise<void> {
    try {
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.update.sql');
      const update = fs.readFileSync(patch).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async delete(entity: CobrancaDigitalDto): Promise<void> {
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.delete.sql');
    const delet = fs.readFileSync(patch).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: CobrancaDigitalDto, sqlCommand: string): Promise<void> {
    const pool = await this.connect.getConnection();

    try {
      const transaction = await pool.connect();
      //TODO: FORCE USUARIO LOGADO ENVIRONMENT
      await transaction.request().query(`
            BEGIN
              CREATE VARIABLE @CodEmpresa VARCHAR(1) = '1';
              CREATE VARIABLE @CodFilial VARCHAR(1) = '1';
              CREATE VARIABLE @CodUsuario VARCHAR(1) = '1';
              CREATE VARIABLE @NomeUsuario VARCHAR(30) = 'ADMINISTRADOR';
              CREATE VARIABLE @CodEstacaoTrabalho VARCHAR(1) = '1';
              CREATE VARIABLE @EstacaoTrabalho VARCHAR(30) = 'SERVIDOR';
            END;
      `);

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
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
