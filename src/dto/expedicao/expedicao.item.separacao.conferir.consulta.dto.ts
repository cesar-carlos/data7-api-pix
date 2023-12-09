export default class ExpedicaoItemSeparacaoConferirConsultaDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  CodCarrinhoPercurso: string;
  ItemCarrinhoPercurso: string;
  Situacao: string;
  Origem: string;
  CodOrigem: number;
  CodPrioridade: number;
  NomePrioridade: string;
  CodCarrinho: number;
  NomeCarrinho: string;
  CodigoBarrasCarrinho: string;
  SituacaoCarrinho: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodGrupoProduto: number;
  NomeGrupoProduto: string;
  CodMarca?: number;
  NomeMarca?: string;
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
  QuantidadeSeparacao: number;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    CodCarrinhoPercurso: string;
    ItemCarrinhoPercurso: string;
    Situacao: string;
    Origem: string;
    CodOrigem: number;
    CodPrioridade: number;
    NomePrioridade: string;
    CodCarrinho: number;
    NomeCarrinho: string;
    CodigoBarrasCarrinho: string;
    SituacaoCarrinho: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodGrupoProduto: number;
    NomeGrupoProduto: string;
    CodMarca?: number;
    NomeMarca?: string;
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
    QuantidadeSeparacao: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.Situacao = params.Situacao;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.CodPrioridade = params.CodPrioridade;
    this.NomePrioridade = params.NomePrioridade;
    this.CodCarrinho = params.CodCarrinho;
    this.NomeCarrinho = params.NomeCarrinho;
    this.CodigoBarrasCarrinho = params.CodigoBarrasCarrinho;
    this.SituacaoCarrinho = params.SituacaoCarrinho;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
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
    this.QuantidadeSeparacao = params.QuantidadeSeparacao;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodSepararEstoque?: number;
    CodCarrinhoPercurso?: string;
    ItemCarrinhoPercurso?: string;
    Situacao?: string;
    Origem?: string;
    CodOrigem?: number;
    CodPrioridade?: number;
    NomePrioridade?: string;
    CodCarrinho?: number;
    NomeCarrinho?: string;
    CodigoBarrasCarrinho?: string;
    SituacaoCarrinho?: string;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    NomeUnidadeMedida?: string;
    CodGrupoProduto?: number;
    NomeGrupoProduto?: string;
    CodMarca?: number;
    NomeMarca?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    NCM?: string;
    CodigoBarras?: string;
    CodigoBarras2?: string;
    CodigoReferencia?: string;
    CodigoFornecedor?: string;
    CodigoFabricante?: string;
    CodigoOriginal?: string;
    Endereco?: string;
    QuantidadeSeparacao?: number;
  }) {
    return new ExpedicaoItemSeparacaoConferirConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodSepararEstoque: params.CodSepararEstoque ?? this.CodSepararEstoque,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      Situacao: params.Situacao ?? this.Situacao,
      Origem: params.Origem ?? this.Origem,
      CodOrigem: params.CodOrigem ?? this.CodOrigem,
      CodPrioridade: params.CodPrioridade ?? this.CodPrioridade,
      NomePrioridade: params.NomePrioridade ?? this.NomePrioridade,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      NomeCarrinho: params.NomeCarrinho ?? this.NomeCarrinho,
      CodigoBarrasCarrinho: params.CodigoBarrasCarrinho ?? this.CodigoBarrasCarrinho,
      SituacaoCarrinho: params.SituacaoCarrinho ?? this.SituacaoCarrinho,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      NomeUnidadeMedida: params.NomeUnidadeMedida ?? this.NomeUnidadeMedida,
      CodGrupoProduto: params.CodGrupoProduto ?? this.CodGrupoProduto,
      NomeGrupoProduto: params.NomeGrupoProduto ?? this.NomeGrupoProduto,
      CodMarca: params.CodMarca ?? this.CodMarca,
      NomeMarca: params.NomeMarca ?? this.NomeMarca,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      NomeSetorEstoque: params.NomeSetorEstoque ?? this.NomeSetorEstoque,
      NCM: params.NCM ?? this.NCM,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodigoBarras2: params.CodigoBarras2 ?? this.CodigoBarras2,
      CodigoReferencia: params.CodigoReferencia ?? this.CodigoReferencia,
      CodigoFornecedor: params.CodigoFornecedor ?? this.CodigoFornecedor,
      CodigoFabricante: params.CodigoFabricante ?? this.CodigoFabricante,
      CodigoOriginal: params.CodigoOriginal ?? this.CodigoOriginal,
      Endereco: params.Endereco ?? this.Endereco,
      QuantidadeSeparacao: params.QuantidadeSeparacao ?? this.QuantidadeSeparacao,
    });
  }

  static fromObject(object: any): ExpedicaoItemSeparacaoConferirConsultaDto {
    return new ExpedicaoItemSeparacaoConferirConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      Situacao: object.Situacao,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      CodPrioridade: object.CodPrioridade,
      NomePrioridade: object.NomePrioridade,
      CodCarrinho: object.CodCarrinho,
      NomeCarrinho: object.NomeCarrinho,
      CodigoBarrasCarrinho: object.CodigoBarrasCarrinho,
      SituacaoCarrinho: object.SituacaoCarrinho,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
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
      QuantidadeSeparacao: object.QuantidadeSeparacao,
    });
  }

  toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodSepararEstoque: this.CodSepararEstoque,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      Situacao: this.Situacao,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      CodPrioridade: this.CodPrioridade,
      NomePrioridade: this.NomePrioridade,
      CodCarrinho: this.CodCarrinho,
      NomeCarrinho: this.NomeCarrinho,
      CodigoBarrasCarrinho: this.CodigoBarrasCarrinho,
      SituacaoCarrinho: this.SituacaoCarrinho,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
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
      QuantidadeSeparacao: this.QuantidadeSeparacao.toFixed(4),
    };
  }
}
