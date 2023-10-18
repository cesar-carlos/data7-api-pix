import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { ConnectionSybase } from '../infra/connection.sybase';

import LocalBaseRepositoryContract, { params } from '../contracts/local.base.repository.contract';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';
import ParamsCommonRepository from './common.repository/params.common.repository';

export default class LocalSybaseCobrancaDigitalTituloRepository
  implements LocalBaseRepositoryContract<CobrancaDigitalTituloDto>
{
  private connect = new ConnectionSybase();
  constructor() {}

  public async select(): Promise<CobrancaDigitalTituloDto[] | undefined> {
    try {
      const connection = await this.connect.getConnection();
      const pool = await connection.connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.select.sql');
      const sql = fs.readFileSync(patch).toString();
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const entity = result.map((item: any) => {
        return CobrancaDigitalTituloDto.fromObject(item);
      });

      return entity;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async selectWhere(params: params[]): Promise<CobrancaDigitalTituloDto[] | undefined> {
    try {
      const connection = await this.connect.getConnection();
      const pool = await connection.connect();
      const patch = path.resolve(__dirname, '..', 'sql', 'cobranca.digital.titulo.select.sql');
      const select = fs.readFileSync(patch).toString();

      const _params = ParamsCommonRepository.build(params);
      const sql = `${select} WHERE ${_params}`;
      const result = await pool.request().query(sql);
      pool.close();

      if (result.length === 0) return undefined;
      const entitys = result.map((item: any) => {
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
        .input('Observacao', sql.VarChar(2000), entity.observacao?.substring(0, 2000) || '')
        .query(sqlCommand);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      pool.close();
    }
  }
}
