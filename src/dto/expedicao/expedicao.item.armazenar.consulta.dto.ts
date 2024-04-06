export default class ExpedicaoItemArmazenarConsultaDto {
  CodEmpresa: number;
  CodArmazenar: number;
  Item: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodProdutoEndereco: string;
  NomeProdutoEndereco: string;
  CodigoBarras?: string;
  Quantidade: number;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenar: number;
    Item: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodProdutoEndereco: string;
    NomeProdutoEndereco: string;
    CodigoBarras?: string;
    Quantidade: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenar = params.CodArmazenar;
    this.Item = params.Item;

    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.NomeUnidadeMedida = params.NomeUnidadeMedida;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.NomeProdutoEndereco = params.NomeProdutoEndereco;
    this.CodigoBarras = params.CodigoBarras;
    this.Quantidade = params.Quantidade;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodArmazenar?: number;
    Item?: string;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    NomeUnidadeMedida?: string;
    CodProdutoEndereco?: string;
    NomeProdutoEndereco?: string;
    CodigoBarras?: string;
    Quantidade?: number;
  }): ExpedicaoItemArmazenarConsultaDto {
    return new ExpedicaoItemArmazenarConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenar: params.CodArmazenar ?? this.CodArmazenar,
      Item: params.Item ?? this.Item,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      NomeUnidadeMedida: params.NomeUnidadeMedida ?? this.NomeUnidadeMedida,
      CodProdutoEndereco: params.CodProdutoEndereco ?? this.CodProdutoEndereco,
      NomeProdutoEndereco: params.NomeProdutoEndereco ?? this.NomeProdutoEndereco,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      Quantidade: params.Quantidade ?? this.Quantidade,
    });
  }

  static fromObject(object: any): ExpedicaoItemArmazenarConsultaDto {
    return new ExpedicaoItemArmazenarConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodArmazenar: object.CodArmazenar,
      Item: object.Item,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      NomeUnidadeMedida: object.NomeUnidadeMedida,
      CodProdutoEndereco: object.CodProdutoEndereco,
      NomeProdutoEndereco: object.NomeProdutoEndereco,
      CodigoBarras: object.CodigoBarras,
      Quantidade: object.Quantidade,
    });
  }

  toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodArmazenar: this.CodArmazenar,
      Item: this.Item,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      NomeUnidadeMedida: this.NomeUnidadeMedida,
      CodProdutoEndereco: this.CodProdutoEndereco,
      NomeProdutoEndereco: this.NomeProdutoEndereco,
      CodigoBarras: this.CodigoBarras,
      Quantidade: Number(this.Quantidade).toFixed(4),
    };
  }
}
