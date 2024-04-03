export default class ExpedicaoItemArmazenagemDto {
  CodEmpresa: number;
  CodArmazenagem: number;
  Item: string;
  CodCarrinhoPercurso: number;
  ItemCarrinhoPercurso: string;
  CodLocalArmazenagem: number;
  CodSetorEstoque?: number;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  CodigoBarras?: string;
  CodProdutoEndereco: string;
  Quantidade: number;
  QuantidadeArmazenada: number;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenagem: number;
    Item: string;
    CodCarrinhoPercurso: number;
    ItemCarrinhoPercurso: string;
    CodLocalArmazenagem: number;
    CodSetorEstoque?: number;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    CodigoBarras?: string;
    CodProdutoEndereco: string;
    Quantidade: number;
    QuantidadeArmazenada: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenagem = params.CodArmazenagem;
    this.Item = params.Item;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.CodLocalArmazenagem = params.CodLocalArmazenagem;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.CodigoBarras = params.CodigoBarras;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.Quantidade = params.Quantidade;
    this.QuantidadeArmazenada = params.QuantidadeArmazenada;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodArmazenagem?: number;
    Item?: string;
    CodCarrinhoPercurso?: number;
    ItemCarrinhoPercurso?: string;
    CodLocalArmazenagem?: number;
    CodSetorEstoque?: number;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    CodigoBarras?: string;
    CodProdutoEndereco?: string;
    Quantidade?: number;
    QuantidadeArmazenada?: number;
  }): ExpedicaoItemArmazenagemDto {
    return new ExpedicaoItemArmazenagemDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenagem: params.CodArmazenagem ?? this.CodArmazenagem,
      Item: params.Item ?? this.Item,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      CodLocalArmazenagem: params.CodLocalArmazenagem ?? this.CodLocalArmazenagem,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodProdutoEndereco: params.CodProdutoEndereco ?? this.CodProdutoEndereco,
      Quantidade: params.Quantidade ?? this.Quantidade,
      QuantidadeArmazenada: params.QuantidadeArmazenada ?? this.QuantidadeArmazenada,
    });
  }

  static fromObject(object: any): ExpedicaoItemArmazenagemDto {
    return new ExpedicaoItemArmazenagemDto({
      CodEmpresa: object.CodEmpresa,
      CodArmazenagem: object.CodArmazenagem,
      Item: object.Item,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      CodLocalArmazenagem: object.CodLocalArmazenagem,
      CodSetorEstoque: object.CodSetorEstoque,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      CodigoBarras: object.CodigoBarras,
      CodProdutoEndereco: object.CodProdutoEndereco,
      Quantidade: object.Quantidade,
      QuantidadeArmazenada: object.QuantidadeArmazenada,
    });
  }

  toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodArmazenagem: this.CodArmazenagem,
      Item: this.Item,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      CodLocalArmazenagem: this.CodLocalArmazenagem,
      CodSetorEstoque: this.CodSetorEstoque,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      CodigoBarras: this.CodigoBarras,
      CodProdutoEndereco: this.CodProdutoEndereco,
      Quantidade: Number(this.Quantidade).toFixed(4),
      QuantidadeArmazenada: Number(this.QuantidadeArmazenada).toFixed(4),
    };
  }
}
