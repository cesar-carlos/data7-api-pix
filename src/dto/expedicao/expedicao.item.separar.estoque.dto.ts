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
