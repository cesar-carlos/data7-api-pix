export default class ExpedicaoItemSeparacaoEstoqueDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  Item: number;
  SessionId: string;
  CodCarrinho: number;
  CodSeparador: number;
  NomeSeparador: string;
  DataSeparacao: Date;
  HoraSeparacao: string;
  CodProduto: number;
  CodUnidadeMedida: string;
  Quantidade: number;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    Item: number;
    SessionId: string;
    CodCarrinho: number;
    CodSeparador: number;
    NomeSeparador: string;
    DataSeparacao: Date;
    HoraSeparacao: string;
    CodProduto: number;
    CodUnidadeMedida: string;
    Quantidade: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.Item = params.Item;
    this.SessionId = params.SessionId;
    this.CodCarrinho = params.CodCarrinho;
    this.CodSeparador = params.CodSeparador;
    this.NomeSeparador = params.NomeSeparador;
    this.DataSeparacao = params.DataSeparacao;
    this.HoraSeparacao = params.HoraSeparacao;
    this.CodProduto = params.CodProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.Quantidade = params.Quantidade;
  }

  static fromObject(object: any): ExpedicaoItemSeparacaoEstoqueDto {
    return new ExpedicaoItemSeparacaoEstoqueDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      Item: object.Item,
      SessionId: object.SessionId,
      CodCarrinho: object.CodCarrinho,
      CodSeparador: object.CodSeparador,
      NomeSeparador: object.NomeSeparador,
      DataSeparacao: object.DataSeparacao,
      HoraSeparacao: object.HoraSeparacao,
      CodProduto: object.CodProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      Quantidade: object.Quantidade,
    });
  }
}
