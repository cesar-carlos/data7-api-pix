export default class ExpedicaoItemEstoqueDto {
  CodProduto: number;
  NomeProduto: string;
  Ativo: string;
  CodTipoProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodGrupoProduto: number;
  NomeGrupoProduto: string;
  CodMarca: number;
  NomeMarca: string;
  CodSetorEstoque: number;
  NCM: string;
  CodigoBarras: string;
  CodigoBarras2: string;
  CodigoReferencia: string;
  CodigoFornecedor: string;
  CodigoFabricante: string;
  CodigoOriginal: string;
  Endereco: string;

  constructor(params: {
    CodProduto: number;
    NomeProduto: string;
    Ativo: string;
    CodTipoProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodGrupoProduto: number;
    NomeGrupoProduto: string;
    CodMarca: number;
    NomeMarca: string;
    CodSetorEstoque: number;
    NCM: string;
    CodigoBarras: string;
    CodigoBarras2: string;
    CodigoReferencia: string;
    CodigoFornecedor: string;
    CodigoFabricante: string;
    CodigoOriginal: string;
    Endereco: string;
  }) {
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.Ativo = params.Ativo;
    this.CodTipoProduto = params.CodTipoProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.NomeUnidadeMedida = params.NomeUnidadeMedida;
    this.CodGrupoProduto = params.CodGrupoProduto;
    this.NomeGrupoProduto = params.NomeGrupoProduto;
    this.CodMarca = params.CodMarca;
    this.NomeMarca = params.NomeMarca;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NCM = params.NCM;
    this.CodigoBarras = params.CodigoBarras;
    this.CodigoBarras2 = params.CodigoBarras2;
    this.CodigoReferencia = params.CodigoReferencia;
    this.CodigoFornecedor = params.CodigoFornecedor;
    this.CodigoFabricante = params.CodigoFabricante;
    this.CodigoOriginal = params.CodigoOriginal;
    this.Endereco = params.Endereco;
  }

  static fromJson(json: any): ExpedicaoItemEstoqueDto {
    return new ExpedicaoItemEstoqueDto({
      CodProduto: json.CodProduto,
      NomeProduto: json.NomeProduto,
      Ativo: json.Ativo,
      CodTipoProduto: json.CodTipoProduto,
      CodUnidadeMedida: json.CodUnidadeMedida,
      NomeUnidadeMedida: json.NomeUnidadeMedida,
      CodGrupoProduto: json.CodGrupoProduto,
      NomeGrupoProduto: json.NomeGrupoProduto,
      CodMarca: json.CodMarca,
      NomeMarca: json.NomeMarca,
      CodSetorEstoque: json.CodSetorEstoque,
      NCM: json.NCM,
      CodigoBarras: json.CodigoBarras,
      CodigoBarras2: json.CodigoBarras2,
      CodigoReferencia: json.CodigoReferencia,
      CodigoFornecedor: json.CodigoFornecedor,
      CodigoFabricante: json.CodigoFabricante,
      CodigoOriginal: json.CodigoOriginal,
      Endereco: json.Endereco,
    });
  }

  public toJson(): any {
    return {
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      Ativo: this.Ativo,
      CodTipoProduto: this.CodTipoProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      NomeUnidadeMedida: this.NomeUnidadeMedida,
      CodGrupoProduto: this.CodGrupoProduto,
      NomeGrupoProduto: this.NomeGrupoProduto,
      CodMarca: this.CodMarca,
      NomeMarca: this.NomeMarca,
      CodSetorEstoque: this.CodSetorEstoque,
      NCM: this.NCM,
      CodigoBarras: this.CodigoBarras,
      CodigoBarras2: this.CodigoBarras2,
      CodigoReferencia: this.CodigoReferencia,
      CodigoFornecedor: this.CodigoFornecedor,
      CodigoFabricante: this.CodigoFabricante,
      CodigoOriginal: this.CodigoOriginal,
      Endereco: this.Endereco,
    };
  }

  static fromObject(object: any): ExpedicaoItemEstoqueDto {
    return new ExpedicaoItemEstoqueDto({
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      Ativo: object.Ativo,
      CodTipoProduto: object.CodTipoProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      NomeUnidadeMedida: object.NomeUnidadeMedida,
      CodGrupoProduto: object.CodGrupoProduto,
      NomeGrupoProduto: object.NomeGrupoProduto,
      CodMarca: object.CodMarca,
      NomeMarca: object.NomeMarca,
      CodSetorEstoque: object.CodSetorEstoque,
      NCM: object.NCM,
      CodigoBarras: object.CodigoBarras,
      CodigoBarras2: object.CodigoBarras2,
      CodigoReferencia: object.CodigoReferencia,
      CodigoFornecedor: object.CodigoFornecedor,
      CodigoFabricante: object.CodigoFabricante,
      CodigoOriginal: object.CodigoOriginal,
      Endereco: object.Endereco,
    });
  }
}
