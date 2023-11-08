export default class ExpedicaoItemSepararEstoqueDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  Item: string;
  CodSetorEstoque: number;
  Origem: string;
  CodOrigem: number;
  ItemOrigem: string;
  CodLocaArmazenagem: number;
  CodProduto: number;
  CodUnidadeMedida: string;
  Quantidade: number;
  QuantidadeInterna: number;
  QuantidadeExterna: number;
  QuantidadeSeparacao: number;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    Item: string;
    CodSetorEstoque: number;
    Origem: string;
    CodOrigem: number;
    ItemOrigem: string;
    CodLocaArmazenagem: number;
    CodProduto: number;
    CodUnidadeMedida: string;
    Quantidade: number;
    QuantidadeInterna: number;
    QuantidadeExterna: number;
    QuantidadeSeparacao: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.Item = params.Item;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.ItemOrigem = params.ItemOrigem;
    this.CodLocaArmazenagem = params.CodLocaArmazenagem;
    this.CodProduto = params.CodProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.Quantidade = params.Quantidade;
    this.QuantidadeInterna = params.QuantidadeInterna;
    this.QuantidadeExterna = params.QuantidadeExterna;
    this.QuantidadeSeparacao = params.QuantidadeSeparacao;
  }

  public copyWith({
    CodEmpresa,
    CodSepararEstoque,
    Item,
    CodSetorEstoque,
    Origem,
    CodOrigem,
    ItemOrigem,
    CodLocaArmazenagem,
    CodProduto,
    CodUnidadeMedida,
    Quantidade,
    QuantidadeInterna,
    QuantidadeExterna,
    QuantidadeSeparacao,
  }: {
    CodEmpresa?: number;
    CodSepararEstoque?: number;
    Item?: string;
    CodSetorEstoque?: number;
    Origem?: string;
    CodOrigem?: number;
    ItemOrigem?: string;
    CodLocaArmazenagem?: number;
    CodProduto?: number;
    CodUnidadeMedida?: string;
    Quantidade?: number;
    QuantidadeInterna?: number;
    QuantidadeExterna?: number;
    QuantidadeSeparacao?: number;
  }) {
    return new ExpedicaoItemSepararEstoqueDto({
      CodEmpresa: CodEmpresa ?? this.CodEmpresa,
      CodSepararEstoque: CodSepararEstoque ?? this.CodSepararEstoque,
      Item: Item ?? this.Item,
      CodSetorEstoque: CodSetorEstoque ?? this.CodSetorEstoque,
      Origem: Origem ?? this.Origem,
      CodOrigem: CodOrigem ?? this.CodOrigem,
      ItemOrigem: ItemOrigem ?? this.ItemOrigem,
      CodLocaArmazenagem: CodLocaArmazenagem ?? this.CodLocaArmazenagem,
      CodProduto: CodProduto ?? this.CodProduto,
      CodUnidadeMedida: CodUnidadeMedida ?? this.CodUnidadeMedida,
      Quantidade: Quantidade ?? this.Quantidade,
      QuantidadeInterna: QuantidadeInterna ?? this.QuantidadeInterna,
      QuantidadeExterna: QuantidadeExterna ?? this.QuantidadeExterna,
      QuantidadeSeparacao: QuantidadeSeparacao ?? this.QuantidadeSeparacao,
    });
  }

  static fromJson(json: any): ExpedicaoItemSepararEstoqueDto {
    return new ExpedicaoItemSepararEstoqueDto({
      CodEmpresa: json.CodEmpresa,
      CodSepararEstoque: json.CodSepararEstoque,
      Item: json.Item,
      CodSetorEstoque: json.CodSetorEstoque,
      Origem: json.Origem,
      CodOrigem: json.CodOrigem,
      ItemOrigem: json.ItemOrigem,
      CodLocaArmazenagem: json.CodLocaArmazenagem,
      CodProduto: json.CodProduto,
      CodUnidadeMedida: json.CodUnidadeMedida,
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
      CodSetorEstoque: this.CodSetorEstoque,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      ItemOrigem: this.ItemOrigem,
      CodLocaArmazenagem: this.CodLocaArmazenagem,
      CodProduto: this.CodProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      Quantidade: this.Quantidade,
      QuantidadeInterna: this.QuantidadeInterna,
      QuantidadeExterna: this.QuantidadeExterna,
      QuantidadeSeparacao: this.QuantidadeSeparacao,
    };
  }

  static fromObject(object: any): ExpedicaoItemSepararEstoqueDto {
    return new ExpedicaoItemSepararEstoqueDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      Item: object.Item,
      CodSetorEstoque: object.CodSetorEstoque,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      ItemOrigem: object.ItemOrigem,
      CodLocaArmazenagem: object.CodLocaArmazenagem,
      CodProduto: object.CodProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      Quantidade: object.Quantidade,
      QuantidadeInterna: object.QuantidadeInterna,
      QuantidadeExterna: object.QuantidadeExterna,
      QuantidadeSeparacao: object.QuantidadeSeparacao,
    });
  }
}
