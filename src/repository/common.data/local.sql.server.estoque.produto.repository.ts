import fs from 'fs';
import path from 'path';
import sql from 'mssql';

import { params, pagination } from '../../contracts/local.base.params';

import ConnectionSqlServerMssql from '../../infra/connection.sql.server.mssql';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import EstoqueProdutoDto from '../../dto/common.data/estoque.produto.dto';
import ParamsCommonRepository from '../common/params.common';

export default class LocalSqlServerEstoqueProdutoRepository implements LocalBaseRepositoryContract<EstoqueProdutoDto> {
  private connect = new ConnectionSqlServerMssql();
  private basePatchSQL = ParamsCommonRepository.basePatchSQL('common.data');

  async select(): Promise<EstoqueProdutoDto[]> {
    const pool = await this.connect.getConnection();
    const patchSQL = path.resolve(this.basePatchSQL, 'estoque.produto.select.sql');
    const sql = fs.readFileSync(patchSQL).toString();
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return [];
    const situacoes = result.recordset.map((item: any) => {
      return EstoqueProdutoDto.fromObject(item);
    });

    return situacoes;
  }

  async selectWhere(params: params[]): Promise<EstoqueProdutoDto[]> {
    const pool = await this.connect.getConnection();
    const patchSQL = path.resolve(this.basePatchSQL, 'estoque.produto.select.sql');
    const select = fs.readFileSync(patchSQL).toString();
    const _params = ParamsCommonRepository.build(params);
    const sql = `${select} WHERE ${_params}`;
    const result = await pool.request().query(sql);
    pool.close();

    if (result.recordset.length === 0) return [];
    const situacoes = result.recordset.map((item: any) => {
      return EstoqueProdutoDto.fromObject(item);
    });

    return situacoes;
  }

  async insert(entity: EstoqueProdutoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'estoque.produto.insert.sql');
      const insert = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, insert);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(entity: EstoqueProdutoDto): Promise<void> {
    try {
      const patchSQL = path.resolve(this.basePatchSQL, 'estoque.produto.update.sql');
      const update = fs.readFileSync(patchSQL).toString();
      await this.actonEntity(entity, update);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(entity: EstoqueProdutoDto): Promise<void> {
    const patchSQL = path.resolve(this.basePatchSQL, 'estoque.produto.delete.sql');
    const delet = fs.readFileSync(patchSQL).toString();
    await this.actonEntity(entity, delet);
  }

  private async actonEntity(entity: EstoqueProdutoDto, sqlCommand: string): Promise<void> {
    try {
      const pool = await this.connect.getConnection();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      await transaction
        .request()
        .input('CodProduto', sql.Int, entity.CodProduto)
        .input('Nome', sql.VarChar(100), entity.Nome)
        .input('Descricao', sql.VarChar(2000), entity.Descricao)
        .input('Ativo', sql.VarChar(1), entity.Ativo)
        .input('CodTipoProduto', sql.VarChar(2), entity.CodTipoProduto)
        .input('CodUnidadeMedida', sql.VarChar(6), entity.CodUnidadeMedida)
        .input('DataCadastro', sql.Date, entity.DataCadastro)
        .input('CodGrupoProduto', sql.Int, entity.CodGrupoProduto)
        .input('CodMarca', sql.Int, entity.CodMarca)
        .input('CodClasseProduto', sql.VarChar(6), entity.CodClasseProduto)
        .input('CodConceitoProduto', sql.VarChar(6), entity.CodConceitoProduto)
        .input('ProdutoComposto', sql.VarChar(1), entity.ProdutoComposto)
        .input('CodigoReferencia', sql.VarChar(50), entity.CodigoReferencia)
        .input('CodigoOriginal', sql.VarChar(50), entity.CodigoOriginal)
        .input('CodigoFabricante', sql.VarChar(50), entity.CodigoFabricante)
        .input('CodLocalArmazenagem', sql.Int, entity.CodLocalArmazenagem)
        .input('CodSetorEstoque', sql.Int, entity.CodSetorEstoque)
        .input('MovimentaEstoque', sql.VarChar(1), entity.MovimentaEstoque)
        .input('OrigemMercadoria', sql.VarChar(50), entity.OrigemMercadoria)
        .input('PontoPedido', sql.Money, entity.PontoPedido)
        .input('Endereco', sql.VarChar(50), entity.Endereco)
        .input('Pesavel', sql.VarChar(1), entity.Pesavel)
        .input('PesoBruto', sql.Money, entity.PesoBruto)
        .input('PesoLiquido', sql.Money, entity.PesoLiquido)
        .input('PossuiNumeroSerie', sql.VarChar(1), entity.PossuiNumeroSerie)
        .input('ControlaLote', sql.VarChar(1), entity.ControlaLote)
        .input('NCM', sql.VarChar(8), entity.NCM)
        .input('PermiteVenda', sql.VarChar(1), entity.PermiteVenda)
        .input('CodGrupoTributacao', sql.Int, entity.CodGrupoTributacao)
        .input('PermiteNotaFiscal', sql.VarChar(3), entity.PermiteNotaFiscal)
        .input('PermiteDesconto', sql.VarChar(1), entity.PermiteDesconto)
        .input('MargemLucro', sql.Float, entity.MargemLucro)
        .input('PrecoVenda', sql.Float, entity.PrecoVenda)
        .query(sqlCommand);

      await transaction.commit();
      pool.close();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
