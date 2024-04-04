export default class ExpedicaoItemArmazenarDto {
  CodEmpresa: number;
  CodArmazenar: number;
  Item: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  CodSetorEstoque?: number;
  CodigoBarras?: string;
  CodProdutoEndereco: string;
  Quantidade: number;
  QuantidadeArmazenada: number;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenar: number;
    Item: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    CodSetorEstoque?: number;
    CodigoBarras?: string;
    CodProdutoEndereco: string;
    Quantidade: number;
    QuantidadeArmazenada: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenar = params.CodArmazenar;
    this.Item = params.Item;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.CodigoBarras = params.CodigoBarras;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.Quantidade = params.Quantidade;
    this.QuantidadeArmazenada = params.QuantidadeArmazenada;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodArmazenar?: number;
    Item?: string;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    CodSetorEstoque?: number;
    CodigoBarras?: string;
    CodProdutoEndereco?: string;
    Quantidade?: number;
    QuantidadeArmazenada?: number;
  }): ExpedicaoItemArmazenarDto {
    return new ExpedicaoItemArmazenarDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenar: params.CodArmazenar ?? this.CodArmazenar,
      Item: params.Item ?? this.Item,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodProdutoEndereco: params.CodProdutoEndereco ?? this.CodProdutoEndereco,
      Quantidade: params.Quantidade ?? this.Quantidade,
      QuantidadeArmazenada: params.QuantidadeArmazenada ?? this.QuantidadeArmazenada,
    });
  }

  static fromObject(object: any): ExpedicaoItemArmazenarDto {
    return new ExpedicaoItemArmazenarDto({
      CodEmpresa: object.CodEmpresa,
      CodArmazenar: object.CodArmazenar,
      Item: object.Item,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      CodSetorEstoque: object.CodSetorEstoque,
      CodigoBarras: object.CodigoBarras,
      CodProdutoEndereco: object.CodProdutoEndereco,
      Quantidade: object.Quantidade,
      QuantidadeArmazenada: object.QuantidadeArmazenada,
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
      CodSetorEstoque: this.CodSetorEstoque,
      CodigoBarras: this.CodigoBarras,
      CodProdutoEndereco: this.CodProdutoEndereco,
      Quantidade: Number(this.Quantidade).toFixed(4),
      QuantidadeArmazenada: Number(this.QuantidadeArmazenada).toFixed(4),
    };
  }
}
