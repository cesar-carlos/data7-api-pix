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

  public copyWith({
    CodEmpresa,
    CodSepararEstoque,
    Item,
    SessionId,
    CodCarrinho,
    CodSeparador,
    NomeSeparador,
    DataSeparacao,
    HoraSeparacao,
    CodProduto,
    CodUnidadeMedida,
    Quantidade,
  }: {
    CodEmpresa?: number;
    CodSepararEstoque?: number;
    Item?: number;
    SessionId?: string;
    CodCarrinho?: number;
    CodSeparador?: number;
    NomeSeparador?: string;
    DataSeparacao?: Date;
    HoraSeparacao?: string;
    CodProduto?: number;
    CodUnidadeMedida?: string;
    Quantidade?: number;
  }) {
    return new ExpedicaoItemSeparacaoEstoqueDto({
      CodEmpresa: CodEmpresa ?? this.CodEmpresa,
      CodSepararEstoque: CodSepararEstoque ?? this.CodSepararEstoque,
      Item: Item ?? this.Item,
      SessionId: SessionId ?? this.SessionId,
      CodCarrinho: CodCarrinho ?? this.CodCarrinho,
      CodSeparador: CodSeparador ?? this.CodSeparador,
      NomeSeparador: NomeSeparador ?? this.NomeSeparador,
      DataSeparacao: DataSeparacao ?? this.DataSeparacao,
      HoraSeparacao: HoraSeparacao ?? this.HoraSeparacao,
      CodProduto: CodProduto ?? this.CodProduto,
      CodUnidadeMedida: CodUnidadeMedida ?? this.CodUnidadeMedida,
      Quantidade: Quantidade ?? this.Quantidade,
    });
  }

  static fromJson(json: any): ExpedicaoItemSeparacaoEstoqueDto {
    return new ExpedicaoItemSeparacaoEstoqueDto({
      CodEmpresa: json.CodEmpresa,
      CodSepararEstoque: json.CodSepararEstoque,
      Item: json.Item,
      SessionId: json.SessionId,
      CodCarrinho: json.CodCarrinho,
      CodSeparador: json.CodSeparador,
      NomeSeparador: json.NomeSeparador,
      DataSeparacao: json.DataSeparacao,
      HoraSeparacao: json.HoraSeparacao,
      CodProduto: json.CodProduto,
      CodUnidadeMedida: json.CodUnidadeMedida,
      Quantidade: json.Quantidade,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodSepararEstoque: this.CodSepararEstoque,
      Item: this.Item,
      SessionId: this.SessionId,
      CodCarrinho: this.CodCarrinho,
      CodSeparador: this.CodSeparador,
      NomeSeparador: this.NomeSeparador,
      DataSeparacao: this.DataSeparacao,
      HoraSeparacao: this.HoraSeparacao,
      CodProduto: this.CodProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      Quantidade: this.Quantidade,
    };
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
