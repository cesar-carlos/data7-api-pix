export default class ExpedicaoItemSeparacaoResumoConsultaDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  Origem: String;
  CodOrigem: number;
  Situacao: string;
  CodCarrinhoPercurso: number;
  ItemCarrinhoPercurso: string;
  CodCarrinho: number;
  DescricaoCarrinho: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  DescricaoUnidadeMedida: string;
  CodigoBarras?: string;
  CodProdutoEndereco?: string;
  DescricaoProdutoEndereco?: string;
  Quantidade: number;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    Origem: String;
    CodOrigem: number;
    Situacao: string;
    CodCarrinhoPercurso: number;
    ItemCarrinhoPercurso: string;
    CodCarrinho: number;
    DescricaoCarrinho: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    DescricaoUnidadeMedida: string;
    CodigoBarras?: string;
    CodProdutoEndereco?: string;
    DescricaoProdutoEndereco?: string;
    Quantidade: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.Situacao = params.Situacao;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.CodCarrinho = params.CodCarrinho;
    this.DescricaoCarrinho = params.DescricaoCarrinho;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.DescricaoUnidadeMedida = params.DescricaoUnidadeMedida;
    this.CodigoBarras = params.CodigoBarras;
    this.CodProdutoEndereco = params.CodProdutoEndereco;
    this.DescricaoProdutoEndereco = params.DescricaoProdutoEndereco;
    this.Quantidade = params.Quantidade;
  }

  public copyWith({
    CodEmpresa,
    CodSepararEstoque,
    Origem,
    CodOrigem,
    Situacao,
    CodCarrinhoPercurso,
    ItemCarrinhoPercurso,
    CodCarrinho,
    DescricaoCarrinho,
    CodProduto,
    NomeProduto,
    CodUnidadeMedida,
    DescricaoUnidadeMedida,
    CodigoBarras,
    CodProdutoEndereco,
    DescricaoProdutoEndereco,
    Quantidade,
  }: {
    CodEmpresa?: number;
    CodSepararEstoque?: number;
    Origem?: String;
    CodOrigem?: number;
    Situacao?: string;
    CodCarrinhoPercurso?: number;
    ItemCarrinhoPercurso?: string;
    CodCarrinho?: number;
    DescricaoCarrinho?: string;
    CodProduto?: number;
    NomeProduto?: string;
    CodUnidadeMedida?: string;
    DescricaoUnidadeMedida?: string;
    CodigoBarras?: string;
    CodProdutoEndereco?: string;
    DescricaoProdutoEndereco?: string;
    Quantidade?: number;
  }): ExpedicaoItemSeparacaoResumoConsultaDto {
    return new ExpedicaoItemSeparacaoResumoConsultaDto({
      CodEmpresa: CodEmpresa ?? this.CodEmpresa,
      CodSepararEstoque: CodSepararEstoque ?? this.CodSepararEstoque,
      Origem: Origem ?? this.Origem,
      CodOrigem: CodOrigem ?? this.CodOrigem,
      Situacao: Situacao ?? this.Situacao,
      CodCarrinhoPercurso: CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      CodCarrinho: CodCarrinho ?? this.CodCarrinho,
      DescricaoCarrinho: DescricaoCarrinho ?? this.DescricaoCarrinho,
      CodProduto: CodProduto ?? this.CodProduto,
      NomeProduto: NomeProduto ?? this.NomeProduto,
      CodUnidadeMedida: CodUnidadeMedida ?? this.CodUnidadeMedida,
      DescricaoUnidadeMedida: DescricaoUnidadeMedida ?? this.DescricaoUnidadeMedida,
      CodigoBarras: CodigoBarras ?? this.CodigoBarras,
      CodProdutoEndereco: CodProdutoEndereco ?? this.CodProdutoEndereco,
      DescricaoProdutoEndereco: DescricaoProdutoEndereco ?? this.DescricaoProdutoEndereco,
      Quantidade: Quantidade ?? this.Quantidade,
    });
  }

  public static fromObject(object: any): ExpedicaoItemSeparacaoResumoConsultaDto {
    return new ExpedicaoItemSeparacaoResumoConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      Situacao: object.Situacao,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      CodCarrinho: object.CodCarrinho,
      DescricaoCarrinho: object.DescricaoCarrinho,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      DescricaoUnidadeMedida: object.DescricaoUnidadeMedida,
      CodigoBarras: object.CodigoBarras,
      CodProdutoEndereco: object.CodProdutoEndereco,
      DescricaoProdutoEndereco: object.DescricaoProdutoEndereco,
      Quantidade: object.Quantidade,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodSepararEstoque: this.CodSepararEstoque,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      Situacao: this.Situacao,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      CodCarrinho: this.CodCarrinho,
      DescricaoCarrinho: this.DescricaoCarrinho,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      DescricaoUnidadeMedida: this.DescricaoUnidadeMedida,
      CodigoBarras: this.CodigoBarras,
      CodProdutoEndereco: this.CodProdutoEndereco,
      DescricaoProdutoEndereco: this.DescricaoProdutoEndereco,
      Quantidade: Number(this.Quantidade).toFixed(4),
    };
  }
}
