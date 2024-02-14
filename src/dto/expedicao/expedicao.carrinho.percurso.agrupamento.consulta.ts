export default class ExpedicaoCarrinhoPercursoAgrupamentoConsulta {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  ItemAgrupamento?: string;
  ItemCarrinhoPercurso: string;
  Origem: string;
  Situacao: string;
  CodCarrinhoAgrupador?: number;
  NomeCarrinhoAgrupador?: string;
  CodCarrinho: number;
  NomeCarrinho: string;
  CodigoBarrasCarrinho: string;
  DataInicio: Date;
  HoraInicio: string;
  CodUsuarioInicio: number;
  NomeUsuarioInicio: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinhoPercurso: number;
    ItemAgrupamento?: string;
    ItemCarrinhoPercurso: string;
    Origem: string;
    Situacao: string;
    CodCarrinhoAgrupador?: number;
    NomeCarrinhoAgrupador?: string;
    CodCarrinho: number;
    NomeCarrinho: string;
    CodigoBarrasCarrinho: string;
    DataInicio: Date;
    HoraInicio: string;
    CodUsuarioInicio: number;
    NomeUsuarioInicio: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.ItemAgrupamento = params.ItemAgrupamento;
    this.ItemCarrinhoPercurso = params.ItemCarrinhoPercurso;
    this.Origem = params.Origem;
    this.Situacao = params.Situacao;
    this.CodCarrinhoAgrupador = params.CodCarrinhoAgrupador;
    this.NomeCarrinhoAgrupador = params.NomeCarrinhoAgrupador;
    this.CodCarrinho = params.CodCarrinho;
    this.NomeCarrinho = params.NomeCarrinho;
    this.CodigoBarrasCarrinho = params.CodigoBarrasCarrinho;
    this.DataInicio = params.DataInicio;
    this.HoraInicio = params.HoraInicio;
    this.CodUsuarioInicio = params.CodUsuarioInicio;
    this.NomeUsuarioInicio = params.NomeUsuarioInicio;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    ItemAgrupamento?: string;
    ItemCarrinhoPercurso?: string;
    Origem?: string;
    Situacao?: string;
    CodCarrinhoAgrupador?: number;
    NomeCarrinhoAgrupador?: string;
    CodCarrinho?: number;
    NomeCarrinho?: string;
    CodigoBarrasCarrinho?: string;
    DataInicio?: Date;
    HoraInicio?: string;
    CodUsuarioInicio?: number;
    NomeUsuarioInicio?: string;
  }) {
    return new ExpedicaoCarrinhoPercursoAgrupamentoConsulta({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      ItemAgrupamento: params.ItemAgrupamento ?? this.ItemAgrupamento,
      ItemCarrinhoPercurso: params.ItemCarrinhoPercurso ?? this.ItemCarrinhoPercurso,
      Origem: params.Origem ?? this.Origem,
      Situacao: params.Situacao ?? this.Situacao,
      CodCarrinhoAgrupador: params.CodCarrinhoAgrupador ?? this.CodCarrinhoAgrupador,
      NomeCarrinhoAgrupador: params.NomeCarrinhoAgrupador ?? this.NomeCarrinhoAgrupador,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      NomeCarrinho: params.NomeCarrinho ?? this.NomeCarrinho,
      CodigoBarrasCarrinho: params.CodigoBarrasCarrinho ?? this.CodigoBarrasCarrinho,
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
      ItemAgrupamento: object.ItemAgrupamento,
      ItemCarrinhoPercurso: object.ItemCarrinhoPercurso,
      Origem: object.Origem,
      Situacao: object.Situacao,
      CodCarrinhoAgrupador: object.CodCarrinhoAgrupador,
      NomeCarrinhoAgrupador: object.NomeCarrinhoAgrupador,
      CodCarrinho: object.CodCarrinho,
      NomeCarrinho: object.NomeCarrinho,
      CodigoBarrasCarrinho: object.CodigoBarrasCarrinho,
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
      ItemAgrupamento: this.ItemAgrupamento,
      ItemCarrinhoPercurso: this.ItemCarrinhoPercurso,
      Origem: this.Origem,
      Situacao: this.Situacao,
      CodCarrinhoAgrupador: this.CodCarrinhoAgrupador,
      NomeCarrinhoAgrupador: this.NomeCarrinhoAgrupador,
      CodCarrinho: this.CodCarrinho,
      NomeCarrinho: this.NomeCarrinho,
      CodigoBarrasCarrinho: this.CodigoBarrasCarrinho,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      CodUsuarioInicio: this.CodUsuarioInicio,
      NomeUsuarioInicio: this.NomeUsuarioInicio,
    };
  }
}
