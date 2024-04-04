export default class ExpedicaoItemArmazenarConsultaDto {
  CodEmpresa: number;
  CodArmazenar: number;
  Item: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodSetorEstoque?: number;
  NomeSetorEstoque?: string;
  CodigoBarras?: string;
  CodProdutoEndereco: string;
  NomeProdutoEndereco: string;
  Quantidade: number;
  QuantidadeArmazenada: number;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenar: number;
    Item: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    CodigoBarras?: string;
    CodProdutoEndereco: string;
    NomeProdutoEndereco: string;
    Quantidade: number;
    QuantidadeArmazenada: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenar = params.CodArmazenar;
    this.Item = params.Item;

    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.NomeUnidadeMedida = params.NomeUnidadeMedida;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NomeSetorEstoque = params.NomeSetorEstoque;
    this.CodigoBarras = params.CodigoBarras;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.NomeProdutoEndereco = params.NomeProdutoEndereco;
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
    NomeUnidadeMedida?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    CodigoBarras?: string;
    CodProdutoEndereco?: string;
    NomeProdutoEndereco?: string;
    Quantidade?: number;
    QuantidadeArmazenada?: number;
  }): ExpedicaoItemArmazenarConsultaDto {
    return new ExpedicaoItemArmazenarConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenar: params.CodArmazenar ?? this.CodArmazenar,
      Item: params.Item ?? this.Item,

      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      NomeUnidadeMedida: params.NomeUnidadeMedida ?? this.NomeUnidadeMedida,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      NomeSetorEstoque: params.NomeSetorEstoque ?? this.NomeSetorEstoque,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodProdutoEndereco: params.CodProdutoEndereco ?? this.CodProdutoEndereco,
      NomeProdutoEndereco: params.NomeProdutoEndereco ?? this.NomeProdutoEndereco,
      Quantidade: params.Quantidade ?? this.Quantidade,
      QuantidadeArmazenada: params.QuantidadeArmazenada ?? this.QuantidadeArmazenada,
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
      CodSetorEstoque: object.CodSetorEstoque,
      NomeSetorEstoque: object.NomeSetorEstoque,
      CodigoBarras: object.CodigoBarras,
      CodProdutoEndereco: object.CodProdutoEndereco,
      NomeProdutoEndereco: object.NomeProdutoEndereco,
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
      NomeUnidadeMedida: this.NomeUnidadeMedida,
      CodSetorEstoque: this.CodSetorEstoque,
      NomeSetorEstoque: this.NomeSetorEstoque,
      CodigoBarras: this.CodigoBarras,
      CodProdutoEndereco: this.CodProdutoEndereco,
      NomeProdutoEndereco: this.NomeProdutoEndereco,
      Quantidade: Number(this.Quantidade).toFixed(4),
      QuantidadeArmazenada: Number(this.QuantidadeArmazenada).toFixed(4),
    };
  }
}
