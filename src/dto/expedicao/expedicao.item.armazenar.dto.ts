export default class ExpedicaoItemArmazenarDto {
  CodEmpresa: number;
  CodArmazenar: number;
  Item: string;
  CodCarrinhoPercurso?: number;
  ItemCarrinhoPercurso?: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  CodProdutoEndereco: string;
  CodigoBarras?: string;
  Quantidade: number;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenar: number;
    Item: string;
    CodCarrinhoPercurso?: number;
    ItemCarrinhoPercurso?: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    CodProdutoEndereco: string;
    CodigoBarras?: string;
    Quantidade: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenar = params.CodArmazenar;
    this.Item = params.Item;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.CodigoBarras = params.CodigoBarras;
    this.Quantidade = params.Quantidade;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodArmazenar?: number;
    Item?: string;
    CodCarrinhoPercurso?: number;
    ItemCarrinhoPercurso?: string;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    CodProdutoEndereco?: string;
    CodigoBarras?: string;
    Quantidade?: number;
  }): ExpedicaoItemArmazenarDto {
    return new ExpedicaoItemArmazenarDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenar: params.CodArmazenar ?? this.CodArmazenar,
      Item: params.Item ?? this.Item,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      CodProdutoEndereco: params.CodProdutoEndereco ?? this.CodProdutoEndereco,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      Quantidade: params.Quantidade ?? this.Quantidade,
    });
  }

  static fromObject(object: any): ExpedicaoItemArmazenarDto {
    return new ExpedicaoItemArmazenarDto({
      CodEmpresa: object.CodEmpresa,
      CodArmazenar: object.CodArmazenar,
      Item: object.Item,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      CodProdutoEndereco: object.CodProdutoEndereco,
      CodigoBarras: object.CodigoBarras,
      Quantidade: object.Quantidade,
    });
  }

  toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodArmazenar: this.CodArmazenar,
      Item: this.Item,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      CodProdutoEndereco: this.CodProdutoEndereco,
      CodigoBarras: this.CodigoBarras,
      Quantidade: Number(this.Quantidade).toFixed(4),
    };
  }
}
