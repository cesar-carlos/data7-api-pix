export default class ExpedicaoCarrinhoDto {
  CodEmpresa: number;
  CodCarrinho: number;
  CodigoBarras: string;
  Descricao: string;
  Situacao: string;
  Ativo: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinho: number;
    CodigoBarras: string;
    Descricao: string;
    Situacao: string;
    Ativo: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinho = params.CodCarrinho;
    this.CodigoBarras = params.CodigoBarras;
    this.Descricao = params.Descricao;
    this.Situacao = params.Situacao;
    this.Ativo = params.Ativo;
  }

  static fromObject(object: any): ExpedicaoCarrinhoDto {
    return new ExpedicaoCarrinhoDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinho: object.CodCarrinho,
      CodigoBarras: object.CodigoBarras,
      Descricao: object.Descricao,
      Situacao: object.Situacao,
      Ativo: object.Ativo,
    });
  }
}
