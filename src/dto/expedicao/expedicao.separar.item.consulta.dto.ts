export default class ExpedicaoSepararItemConsultaDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  Item: string;
  Origem: string;
  CodOrigem: number;
  ItemOrigem: string;
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
  CodSetorEstoque?: number;
  NomeSetorEstoque?: string;
  NCM: string;
  CodigoBarras?: string;
  CodigoBarras2?: string;
  CodigoReferencia?: string;
  CodigoFornecedor?: string;
  CodigoFabricante?: string;
  CodigoOriginal?: string;
  Endereco?: string;
  CodLocaArmazenagem: number;
  NomeLocaArmazenagem: string;
  Quantidade: number;
  QuantidadeInterna: number;
  QuantidadeExterna: number;
  QuantidadeSeparacao: number;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    Item: string;
    Origem: string;
    CodOrigem: number;
    ItemOrigem: string;
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
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    NCM: string;
    CodigoBarras?: string;
    CodigoBarras2?: string;
    CodigoReferencia?: string;
    CodigoFornecedor?: string;
    CodigoFabricante?: string;
    CodigoOriginal?: string;
    Endereco?: string;
    CodLocaArmazenagem: number;
    NomeLocaArmazenagem: string;
    Quantidade: number;
    QuantidadeInterna: number;
    QuantidadeExterna: number;
    QuantidadeSeparacao: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.Item = params.Item;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.ItemOrigem = params.ItemOrigem;
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
    this.NomeSetorEstoque = params.NomeSetorEstoque;
    this.NCM = params.NCM;
    this.CodigoBarras = params.CodigoBarras;
    this.CodigoBarras2 = params.CodigoBarras2;
    this.CodigoReferencia = params.CodigoReferencia;
    this.CodigoFornecedor = params.CodigoFornecedor;
    this.CodigoFabricante = params.CodigoFabricante;
    this.CodigoOriginal = params.CodigoOriginal;
    this.Endereco = params.Endereco;
    this.CodLocaArmazenagem = params.CodLocaArmazenagem;
    this.NomeLocaArmazenagem = params.NomeLocaArmazenagem;
    this.Quantidade = params.Quantidade;
    this.QuantidadeInterna = params.QuantidadeInterna;
    this.QuantidadeExterna = params.QuantidadeExterna;
    this.QuantidadeSeparacao = params.QuantidadeSeparacao;
  }

  static fromJson(json: any) {
    return new ExpedicaoSepararItemConsultaDto({
      CodEmpresa: json.CodEmpresa,
      CodSepararEstoque: json.CodSepararEstoque,
      Item: json.Item,
      Origem: json.Origem,
      CodOrigem: json.CodOrigem,
      ItemOrigem: json.ItemOrigem,
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
      NomeSetorEstoque: json.NomeSetorEstoque,
      NCM: json.NCM,
      CodigoBarras: json.CodigoBarras,
      CodigoBarras2: json.CodigoBarras2,
      CodigoReferencia: json.CodigoReferencia,
      CodigoFornecedor: json.CodigoFornecedor,
      CodigoFabricante: json.CodigoFabricante,
      CodigoOriginal: json.CodigoOriginal,
      Endereco: json.Endereco,
      CodLocaArmazenagem: json.CodLocaArmazenagem,
      NomeLocaArmazenagem: json.NomeLocaArmazenagem,
      Quantidade: json.Quantidade,
      QuantidadeInterna: json.QuantidadeInterna,
      QuantidadeExterna: json.QuantidadeExterna,
      QuantidadeSeparacao: json.QuantidadeSeparacao,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodSepararEstoque: this.CodSepararEstoque,
      Item: this.Item,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      ItemOrigem: this.ItemOrigem,
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
      NomeSetorEstoque: this.NomeSetorEstoque,
      NCM: this.NCM,
      CodigoBarras: this.CodigoBarras,
      CodigoBarras2: this.CodigoBarras2,
      CodigoReferencia: this.CodigoReferencia,
      CodigoFornecedor: this.CodigoFornecedor,
      CodigoFabricante: this.CodigoFabricante,
      CodigoOriginal: this.CodigoOriginal,
      Endereco: this.Endereco,
      CodLocaArmazenagem: this.CodLocaArmazenagem,
      NomeLocaArmazenagem: this.NomeLocaArmazenagem,
      Quantidade: this.Quantidade.toFixed(4),
      QuantidadeInterna: this.QuantidadeInterna.toFixed(4),
      QuantidadeExterna: this.QuantidadeExterna.toFixed(4),
      QuantidadeSeparacao: this.QuantidadeSeparacao.toFixed(4),
    };
  }

  static fromObject(object: any): ExpedicaoSepararItemConsultaDto {
    return new ExpedicaoSepararItemConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      Item: object.Item,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      ItemOrigem: object.ItemOrigem,
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
      NomeSetorEstoque: object.NomeSetorEstoque,
      NCM: object.NCM,
      CodigoBarras: object.CodigoBarras,
      CodigoBarras2: object.CodigoBarras2,
      CodigoReferencia: object.CodigoReferencia,
      CodigoFornecedor: object.CodigoFornecedor,
      CodigoFabricante: object.CodigoFabricante,
      CodigoOriginal: object.CodigoOriginal,
      Endereco: object.Endereco,
      CodLocaArmazenagem: object.CodLocaArmazenagem,
      NomeLocaArmazenagem: object.NomeLocaArmazenagem,
      Quantidade: object.Quantidade,
      QuantidadeInterna: object.QuantidadeInterna,
      QuantidadeExterna: object.QuantidadeExterna,
      QuantidadeSeparacao: object.QuantidadeSeparacao,
    });
  }
}
