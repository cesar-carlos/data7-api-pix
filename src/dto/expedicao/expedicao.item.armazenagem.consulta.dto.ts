export default class ExpedicaoItemArmazenagemConsultaDto {
  CodEmpresa: number;
  CodArmazenagem: number;
  Item: string;
  CodCarrinhoPercurso: number;
  ItemCarrinhoPercurso: string;
  CodLocalArmazenagem: number;
  NomeLocalArmazenagem: string;
  CodSetorEstoque?: number;
  NomeSetorEstoque?: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodigoBarras?: string;
  CodProdutoEndereco: string;
  NomeProdutoEndereco: string;
  Quantidade: number;
  QuantidadeArmazenada: number;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenagem: number;
    Item: string;
    CodCarrinhoPercurso: number;
    ItemCarrinhoPercurso: string;
    CodLocalArmazenagem: number;
    NomeLocalArmazenagem: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodigoBarras?: string;
    CodProdutoEndereco: string;
    NomeProdutoEndereco: string;
    Quantidade: number;
    QuantidadeArmazenada: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenagem = params.CodArmazenagem;
    this.Item = params.Item;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.CodLocalArmazenagem = params.CodLocalArmazenagem;
    this.NomeLocalArmazenagem = params.NomeLocalArmazenagem;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NomeSetorEstoque = params.NomeSetorEstoque;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.NomeUnidadeMedida = params.NomeUnidadeMedida;
    this.CodigoBarras = params.CodigoBarras;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.NomeProdutoEndereco = params.NomeProdutoEndereco;
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
    NomeLocalArmazenagem?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    NomeUnidadeMedida?: string;
    CodigoBarras?: string;
    CodProdutoEndereco?: string;
    NomeProdutoEndereco?: string;
    Quantidade?: number;
    QuantidadeArmazenada?: number;
  }): ExpedicaoItemArmazenagemConsultaDto {
    return new ExpedicaoItemArmazenagemConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenagem: params.CodArmazenagem ?? this.CodArmazenagem,
      Item: params.Item ?? this.Item,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      CodLocalArmazenagem: params.CodLocalArmazenagem ?? this.CodLocalArmazenagem,
      NomeLocalArmazenagem: params.NomeLocalArmazenagem ?? this.NomeLocalArmazenagem,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      NomeSetorEstoque: params.NomeSetorEstoque ?? this.NomeSetorEstoque,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      NomeUnidadeMedida: params.NomeUnidadeMedida ?? this.NomeUnidadeMedida,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodProdutoEndereco: params.CodProdutoEndereco ?? this.CodProdutoEndereco,
      NomeProdutoEndereco: params.NomeProdutoEndereco ?? this.NomeProdutoEndereco,
      Quantidade: params.Quantidade ?? this.Quantidade,
      QuantidadeArmazenada: params.QuantidadeArmazenada ?? this.QuantidadeArmazenada,
    });
  }

  static fromObject(object: any): ExpedicaoItemArmazenagemConsultaDto {
    return new ExpedicaoItemArmazenagemConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodArmazenagem: object.CodArmazenagem,
      Item: object.Item,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      CodLocalArmazenagem: object.CodLocalArmazenagem,
      NomeLocalArmazenagem: object.NomeLocalArmazenagem,
      CodSetorEstoque: object.CodSetorEstoque,
      NomeSetorEstoque: object.NomeSetorEstoque,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      NomeUnidadeMedida: object.NomeUnidadeMedida,
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
      CodArmazenagem: this.CodArmazenagem,
      Item: this.Item,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      CodLocalArmazenagem: this.CodLocalArmazenagem,
      NomeLocalArmazenagem: this.NomeLocalArmazenagem,
      CodSetorEstoque: this.CodSetorEstoque,
      NomeSetorEstoque: this.NomeSetorEstoque,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      NomeUnidadeMedida: this.NomeUnidadeMedida,
      CodigoBarras: this.CodigoBarras,
      CodProdutoEndereco: this.CodProdutoEndereco,
      NomeProdutoEndereco: this.NomeProdutoEndereco,
      Quantidade: Number(this.Quantidade).toFixed(4),
      QuantidadeArmazenada: Number(this.QuantidadeArmazenada).toFixed(4),
    };
  }
}
