export default class ExpedicaoSeparacaoItemConsultaDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  Item: string;
  SessionId: string;
  CodCarrinho: number;
  NomeCarrinho: string;
  CodigoBarrasCarrinho: string;
  CodProduto: number;
  NomeProduto: string;
  CodUnidadeMedida: string;
  NomeUnidadeMedida: string;
  CodGrupoProduto: number;
  NomeGrupoProduto: string;
  CodMarca: number;
  NomeMarca: string;
  CodSetorEstoque?: number;
  NomeSetorEstoque?: string;
  NCM: string;
  CodigoBarras?: string;
  CodigoBarras2?: string;
  CodigoReferencia?: string;
  CodigoFornecedor?: string;
  CodigoFabricante?: string;
  CodigoOriginal?: string;
  Endereco: string;
  CodSeparador: number;
  NomeSeparador: string;
  DataSeparacao: Date;
  HoraSeparacao: string;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    Item: string;
    SessionId: string;
    CodCarrinho: number;
    NomeCarrinho: string;
    CodigoBarrasCarrinho: string;
    CodProduto: number;
    NomeProduto: string;
    CodUnidadeMedida: string;
    NomeUnidadeMedida: string;
    CodGrupoProduto: number;
    NomeGrupoProduto: string;
    CodMarca: number;
    NomeMarca: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    NCM: string;
    CodigoBarras?: string;
    CodigoBarras2?: string;
    CodigoReferencia?: string;
    CodigoFornecedor?: string;
    CodigoFabricante?: string;
    CodigoOriginal?: string;
    Endereco: string;
    CodSeparador: number;
    NomeSeparador: string;
    DataSeparacao: Date;
    HoraSeparacao: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.Item = params.Item;
    this.SessionId = params.SessionId;
    this.CodCarrinho = params.CodCarrinho;
    this.NomeCarrinho = params.NomeCarrinho;
    this.CodigoBarrasCarrinho = params.CodigoBarrasCarrinho;
    this.CodProduto = params.CodProduto;
    this.NomeProduto = params.NomeProduto;
    this.CodUnidadeMedida = params.CodUnidadeMedida;
    this.NomeUnidadeMedida = params.NomeUnidadeMedida;
    this.CodGrupoProduto = params.CodGrupoProduto;
    this.NomeGrupoProduto = params.NomeGrupoProduto;
    this.CodMarca = params.CodMarca;
    this.NomeMarca = params.NomeMarca;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NomeSetorEstoque = params.NomeSetorEstoque;
    this.NCM = params.NCM;
    this.CodigoBarras = params.CodigoBarras;
    this.CodigoBarras2 = params.CodigoBarras2;
    this.CodigoReferencia = params.CodigoReferencia;
    this.CodigoFornecedor = params.CodigoFornecedor;
    this.CodigoFabricante = params.CodigoFabricante;
    this.CodigoOriginal = params.CodigoOriginal;
    this.Endereco = params.Endereco;
    this.CodSeparador = params.CodSeparador;
    this.NomeSeparador = params.NomeSeparador;
    this.DataSeparacao = params.DataSeparacao;
    this.HoraSeparacao = params.HoraSeparacao;
  }

  static fromObject(object: any): ExpedicaoSeparacaoItemConsultaDto {
    return new ExpedicaoSeparacaoItemConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      Item: object.Item,
      SessionId: object.SessionId,
      CodCarrinho: object.CodCarrinho,
      NomeCarrinho: object.NomeCarrinho,
      CodigoBarrasCarrinho: object.CodigoBarrasCarrinho,
      CodProduto: object.CodProduto,
      NomeProduto: object.NomeProduto,
      CodUnidadeMedida: object.CodUnidadeMedida,
      NomeUnidadeMedida: object.NomeUnidadeMedida,
      CodGrupoProduto: object.CodGrupoProduto,
      NomeGrupoProduto: object.NomeGrupoProduto,
      CodMarca: object.CodMarca,
      NomeMarca: object.NomeMarca,
      CodSetorEstoque: object?.CodSetorEstoque,
      NomeSetorEstoque: object?.NomeSetorEstoque,
      NCM: object.NCM,
      CodigoBarras: object?.CodigoBarras,
      CodigoBarras2: object?.CodigoBarras2,
      CodigoReferencia: object?.CodigoReferencia,
      CodigoFornecedor: object?.CodigoFornecedor,
      CodigoFabricante: object?.CodigoFabricante,
      CodigoOriginal: object?.CodigoOriginal,
      Endereco: object.Endereco,
      CodSeparador: object.CodSeparador,
      NomeSeparador: object.NomeSeparador,
      DataSeparacao: object.DataSeparacao,
      HoraSeparacao: object.HoraSeparacao,
    });
  }
}
