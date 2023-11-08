export default class ExpedicaoCarrinhoPercursoDto {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  Origem: string;
  CodOrigem: number;
  CodCarrinho: number;
  Situacao: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinhoPercurso: number;
    Origem: string;
    CodOrigem: number;
    CodCarrinho: number;
    Situacao: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.CodCarrinho = params.CodCarrinho;
    this.Situacao = params.Situacao;
  }

  public copyWith({
    CodEmpresa,
    CodCarrinhoPercurso,
    Origem,
    CodOrigem,
    CodCarrinho,
    Situacao,
  }: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    Origem?: string;
    CodOrigem?: number;
    CodCarrinho?: number;
    Situacao?: string;
  }) {
    return new ExpedicaoCarrinhoPercursoDto({
      CodEmpresa: CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      Origem: Origem ?? this.Origem,
      CodOrigem: CodOrigem ?? this.CodOrigem,
      CodCarrinho: CodCarrinho ?? this.CodCarrinho,
      Situacao: Situacao ?? this.Situacao,
    });
  }

  static fromJson(json: any): ExpedicaoCarrinhoPercursoDto {
    return new ExpedicaoCarrinhoPercursoDto({
      CodEmpresa: json.CodEmpresa,
      CodCarrinhoPercurso: json.CodCarrinhoPercurso,
      Origem: json.Origem,
      CodOrigem: json.CodOrigem,
      CodCarrinho: json.CodCarrinho,
      Situacao: json.Situacao,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      CodCarrinho: this.CodCarrinho,
      Situacao: this.Situacao,
    };
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoDto {
    return new ExpedicaoCarrinhoPercursoDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      CodCarrinho: object.CodCarrinho,
      Situacao: object.Situacao,
    });
  }
}
