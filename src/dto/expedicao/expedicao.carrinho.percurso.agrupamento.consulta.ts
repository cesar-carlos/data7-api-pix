export default class ExpedicaoCarrinhoPercursoAgrupamentoConsulta {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  ItemCarrinhoPercurso: string;
  ItemAgrupamento?: string;
  Origem: string;
  Situacao: string;
  CodCarrinhoAgrupador?: number;
  NomeCarrinhoAgrupador?: string;
  CodCarrinho: number;
  NomeCarrinho: string;
  DataInicio: Date;
  HoraInicio: string;
  CodUsuarioInicio: number;
  NomeUsuarioInicio: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinhoPercurso: number;
    ItemCarrinhoPercurso: string;
    ItemAgrupamento?: string;
    Origem: string;
    Situacao: string;
    CodCarrinhoAgrupador?: number;
    NomeCarrinhoAgrupador?: string;
    CodCarrinho: number;
    NomeCarrinho: string;
    DataInicio: Date;
    HoraInicio: string;
    CodUsuarioInicio: number;
    NomeUsuarioInicio: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.ItemAgrupamento = params.ItemAgrupamento;
    this.Origem = params.Origem;
    this.Situacao = params.Situacao;
    this.CodCarrinhoAgrupador = params.CodCarrinhoAgrupador;
    this.NomeCarrinhoAgrupador = params.NomeCarrinhoAgrupador;
    this.CodCarrinho = params.CodCarrinho;
    this.NomeCarrinho = params.NomeCarrinho;
    this.DataInicio = params.DataInicio;
    this.HoraInicio = params.HoraInicio;
    this.CodUsuarioInicio = params.CodUsuarioInicio;
    this.NomeUsuarioInicio = params.NomeUsuarioInicio;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    ItemCarrinhoPercurso?: string;
    ItemAgrupamento?: string;
    Origem?: string;
    Situacao?: string;
    CodCarrinhoAgrupador?: number;
    NomeCarrinhoAgrupador?: string;
    CodCarrinho?: number;
    NomeCarrinho?: string;
    DataInicio?: Date;
    HoraInicio?: string;
    CodUsuarioInicio?: number;
    NomeUsuarioInicio?: string;
  }) {
    return new ExpedicaoCarrinhoPercursoAgrupamentoConsulta({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      ItemAgrupamento: params.ItemAgrupamento ?? this.ItemAgrupamento,
      Origem: params.Origem ?? this.Origem,
      Situacao: params.Situacao ?? this.Situacao,
      CodCarrinhoAgrupador: params.CodCarrinhoAgrupador ?? this.CodCarrinhoAgrupador,
      NomeCarrinhoAgrupador: params.NomeCarrinhoAgrupador ?? this.NomeCarrinhoAgrupador,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      NomeCarrinho: params.NomeCarrinho ?? this.NomeCarrinho,
      DataInicio: params.DataInicio ?? this.DataInicio,
      HoraInicio: params.HoraInicio ?? this.HoraInicio,
      CodUsuarioInicio: params.CodUsuarioInicio ?? this.CodUsuarioInicio,
      NomeUsuarioInicio: params.NomeUsuarioInicio ?? this.NomeUsuarioInicio,
    });
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoAgrupamentoConsulta {
    return new ExpedicaoCarrinhoPercursoAgrupamentoConsulta({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      ItemAgrupamento: object.ItemAgrupamento,
      Origem: object.Origem,
      Situacao: object.Situacao,
      CodCarrinhoAgrupador: object.CodCarrinhoAgrupador,
      NomeCarrinhoAgrupador: object.NomeCarrinhoAgrupador,
      CodCarrinho: object.CodCarrinho,
      NomeCarrinho: object.NomeCarrinho,
      DataInicio: object.DataInicio,
      HoraInicio: object.HoraInicio,
      CodUsuarioInicio: object.CodUsuarioInicio,
      NomeUsuarioInicio: object.NomeUsuarioInicio,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      ItemAgrupamento: this.ItemAgrupamento,
      Origem: this.Origem,
      Situacao: this.Situacao,
      CodCarrinhoAgrupador: this.CodCarrinhoAgrupador,
      NomeCarrinhoAgrupador: this.NomeCarrinhoAgrupador,
      CodCarrinho: this.CodCarrinho,
      NomeCarrinho: this.NomeCarrinho,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      CodUsuarioInicio: this.CodUsuarioInicio,
      NomeUsuarioInicio: this.NomeUsuarioInicio,
    };
  }
}
