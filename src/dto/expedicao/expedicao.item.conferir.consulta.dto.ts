export default class ExpedicaoItemConferirConsultaDto {
  CodEmpresa: number;
  CodConferir: number;
  Item: string;
  Origem: string;
  CodOrigem: number;
  CodCarrinhoPercurso: number;
  ItemCarrinhoPercurso: string;
  CodCarrinho: number;
  CodProduto: number;
  NomeProduto: string;
  Ativo: string;
  CodTipoProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodGrupoProduto: number;
  NomeGrupoProduto: string;
  CodMarca?: number;
  NomeMarca?: string;
  CodSetorEstoque?: number;
  nomeSetorEstoque?: string;
  NCM?: string;
  CodigoBarras?: string;
  CodigoBarras2?: string;
  CodigoReferencia?: string;
  CodigoFornecedor?: string;
  CodigoFabricante?: string;
  CodigoOriginal?: string;
  Endereco?: string;
  EnderecoDescricao?: string;
  Quantidade: number;
  QuantidadeConferida: number;

  constructor(params: {
    CodEmpresa: number;
    CodConferir: number;
    Item: string;
    Origem: string;
    CodOrigem: number;
    CodCarrinhoPercurso: number;
    ItemCarrinhoPercurso: string;
    CodCarrinho: number;
    CodProduto: number;
    NomeProduto: string;
    Ativo: string;
    CodTipoProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodGrupoProduto: number;
    NomeGrupoProduto: string;
    CodMarca?: number;
    NomeMarca?: string;
    CodSetorEstoque?: number;
    nomeSetorEstoque?: string;
    NCM?: string;
    CodigoBarras?: string;
    CodigoBarras2?: string;
    CodigoReferencia?: string;
    CodigoFornecedor?: string;
    CodigoFabricante?: string;
    CodigoOriginal?: string;
    Endereco?: string;
    EnderecoDescricao?: string;
    Quantidade: number;
    QuantidadeConferida: number;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodConferir = params.CodConferir;
    this.Item = params.Item;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.CodCarrinho = params.CodCarrinho;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.Ativo = params.Ativo;
    this.CodTipoProduto = params.CodTipoProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.NomeUnidadeMedida = params.NomeUnidadeMedida;
    this.CodGrupoProduto = params.CodGrupoProduto;
    this.NomeGrupoProduto = params.NomeGrupoProduto;
    this.CodMarca = params.CodMarca;
    this.NomeMarca = params.NomeMarca;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.nomeSetorEstoque = params.nomeSetorEstoque;
    this.NCM = params.NCM;
    this.CodigoBarras = params.CodigoBarras;
    this.CodigoBarras2 = params.CodigoBarras2;
    this.CodigoReferencia = params.CodigoReferencia;
    this.CodigoFornecedor = params.CodigoFornecedor;
    this.CodigoFabricante = params.CodigoFabricante;
    this.CodigoOriginal = params.CodigoOriginal;
    this.Endereco = params.Endereco;
    this.EnderecoDescricao = params.EnderecoDescricao;
    this.Quantidade = params.Quantidade;
    this.QuantidadeConferida = params.QuantidadeConferida;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodConferir?: number;
    Item?: string;
    Origem?: string;
    CodOrigem?: number;
    CodCarrinhoPercurso?: number;
    ItemCarrinhoPercurso?: string;
    CodCarrinho?: number;
    CodProduto?: number;
    NomeProduto?: string;
    Ativo?: string;
    CodTipoProduto?: string;
    CodUnidadeMedida?: string;
    NomeUnidadeMedida?: string;
    CodGrupoProduto?: number;
    NomeGrupoProduto?: string;
    CodMarca?: number;
    NomeMarca?: string;
    CodSetorEstoque?: number;
    nomeSetorEstoque?: string;
    NCM?: string;
    CodigoBarras?: string;
    CodigoBarras2?: string;
    CodigoReferencia?: string;
    CodigoFornecedor?: string;
    CodigoFabricante?: string;
    CodigoOriginal?: string;
    Endereco?: string;
    EnderecoDescricao?: string;
    Quantidade?: number;
    QuantidadeConferida?: number;
  }) {
    return new ExpedicaoItemConferirConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodConferir: params.CodConferir ?? this.CodConferir,
      Item: params.Item ?? this.Item,
      Origem: params.Origem ?? this.Origem,
      CodOrigem: params.CodOrigem ?? this.CodOrigem,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      CodProduto: params.CodProduto ?? this.CodProduto,
      NomeProduto: params.NomeProduto ?? this.NomeProduto,
      Ativo: params.Ativo ?? this.Ativo,
      CodTipoProduto: params.CodTipoProduto ?? this.CodTipoProduto,
      CodUnidadeMedida: params.CodUnidadeMedida ?? this.CodUnidadeMedida,
      NomeUnidadeMedida: params.NomeUnidadeMedida ?? this.NomeUnidadeMedida,
      CodGrupoProduto: params.CodGrupoProduto ?? this.CodGrupoProduto,
      NomeGrupoProduto: params.NomeGrupoProduto ?? this.NomeGrupoProduto,
      CodMarca: params.CodMarca ?? this.CodMarca,
      NomeMarca: params.NomeMarca ?? this.NomeMarca,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      nomeSetorEstoque: params.nomeSetorEstoque ?? this.nomeSetorEstoque,
      NCM: params.NCM ?? this.NCM,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodigoBarras2: params.CodigoBarras2 ?? this.CodigoBarras2,
      CodigoReferencia: params.CodigoReferencia ?? this.CodigoReferencia,
      CodigoFornecedor: params.CodigoFornecedor ?? this.CodigoFornecedor,
      CodigoFabricante: params.CodigoFabricante ?? this.CodigoFabricante,
      CodigoOriginal: params.CodigoOriginal ?? this.CodigoOriginal,
      Endereco: params.Endereco ?? this.Endereco,
      EnderecoDescricao: params.EnderecoDescricao ?? this.EnderecoDescricao,
      Quantidade: params.Quantidade ?? this.Quantidade,
      QuantidadeConferida: params.QuantidadeConferida ?? this.QuantidadeConferida,
    });
  }

  static fromObject(object: any): ExpedicaoItemConferirConsultaDto {
    return new ExpedicaoItemConferirConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodConferir: object.CodConferir,
      Item: object.Item,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      CodCarrinho: object.CodCarrinho,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      Ativo: object.Ativo,
      CodTipoProduto: object.CodTipoProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      NomeUnidadeMedida: object.NomeUnidadeMedida,
      CodGrupoProduto: object.CodGrupoProduto,
      NomeGrupoProduto: object.NomeGrupoProduto,
      CodMarca: object.CodMarca,
      NomeMarca: object.NomeMarca,
      CodSetorEstoque: object.CodSetorEstoque,
      nomeSetorEstoque: object.nomeSetorEstoque,
      NCM: object.NCM,
      CodigoBarras: object.CodigoBarras,
      CodigoBarras2: object.CodigoBarras2,
      CodigoReferencia: object.CodigoReferencia,
      CodigoFornecedor: object.CodigoFornecedor,
      CodigoFabricante: object.CodigoFabricante,
      CodigoOriginal: object.CodigoOriginal,
      Endereco: object.Endereco,
      EnderecoDescricao: object.EnderecoDescricao,
      Quantidade: object.Quantidade,
      QuantidadeConferida: object.QuantidadeConferida,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodConferir: this.CodConferir,
      Item: this.Item,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      CodCarrinho: this.CodCarrinho,
      CodProduto: this.CodProduto,
      NomeProduto: this.NomeProduto,
      Ativo: this.Ativo,
      CodTipoProduto: this.CodTipoProduto,
      CodUnidadeMedida: this.CodUnidadeMedida,
      NomeUnidadeMedida: this.NomeUnidadeMedida,
      CodGrupoProduto: this.CodGrupoProduto,
      NomeGrupoProduto: this.NomeGrupoProduto,
      CodMarca: this.CodMarca,
      NomeMarca: this.NomeMarca,
      CodSetorEstoque: this.CodSetorEstoque,
      nomeSetorEstoque: this.nomeSetorEstoque,
      NCM: this.NCM,
      CodigoBarras: this.CodigoBarras,
      CodigoBarras2: this.CodigoBarras2,
      CodigoReferencia: this.CodigoReferencia,
      CodigoFornecedor: this.CodigoFornecedor,
      CodigoFabricante: this.CodigoFabricante,
      CodigoOriginal: this.CodigoOriginal,
      Endereco: this.Endereco,
      EnderecoDescricao: this.EnderecoDescricao,
      Quantidade: Number(this.Quantidade).toFixed(4),
      QuantidadeConferida: Number(this.QuantidadeConferida).toFixed(4),
    };
  }
}
