import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import CobrancaDigitalDto from '../dto/cobranca.digital';

export default class LocalSqlServerCobrancaDigitalRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalDto>
{
  private connect = new ConnectionSqlServerMssql();
  constructor() {}

  public async select(): Promise<CobrancaDigitalDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.select.sql');
    const select = fs.readFileSync(patch).toString();
    const result = await pool.request().query(select);
    pool.close();

    if (result.recordset.length === 0) return undefined;
    const chaves = result.recordset.map((item: any) => {
      return CobrancaDigitalDto.fromObject(item);
    });

    return chaves;
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalDto[] | undefined> {
    const pool = await this.connect.getConnection();
    const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.select.sql');
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
    const chaves = result.recordset.map((item: any) => {
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
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodEmpresa', sql.Int, entity.codEmpresa)
        .input('CodFilial', sql.Int, entity.codFilial)
        .input('CodCobrancaDigital', sql.Int, entity.codCobrancaDigital)
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
      pool.close();
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
