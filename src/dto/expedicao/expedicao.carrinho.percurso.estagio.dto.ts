export default class ExpedicaoCarrinhoPercursoEstagioDto {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  Item: string;
  CodPercursoEstagio: number;
  CodCarrinho: number;
  Situacao: string;
  DataInicio: Date;
  HoraInicio: string;
  DataFinalizacao?: Date;
  HoraFinalizacao?: string;
  CodUsuario: number;
  NomeUsuario: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinhoPercurso: number;
    Item: string;
    CodPercursoEstagio: number;
    CodCarrinho: number;
    Situacao: string;
    DataInicio: Date;
    HoraInicio: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodUsuario: number;
    NomeUsuario: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.Item = params.Item;
    this.CodPercursoEstagio = params.CodPercursoEstagio;
    this.CodCarrinho = params.CodCarrinho;
    this.Situacao = params.Situacao;
    this.DataInicio = params.DataInicio;
    this.HoraInicio = params.HoraInicio;
    this.DataFinalizacao = params.DataFinalizacao;
    this.HoraFinalizacao = params.HoraFinalizacao;
    this.CodUsuario = params.CodUsuario;
    this.NomeUsuario = params.NomeUsuario;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    Item?: string;
    CodPercursoEstagio?: number;
    CodCarrinho?: number;
    Situacao?: string;
    DataInicio?: Date;
    HoraInicio?: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodUsuario?: number;
    NomeUsuario?: string;
  }): ExpedicaoCarrinhoPercursoEstagioDto {
    return new ExpedicaoCarrinhoPercursoEstagioDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      Item: params.Item ?? this.Item,
      CodPercursoEstagio: params.CodPercursoEstagio ?? this.CodPercursoEstagio,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      Situacao: params.Situacao ?? this.Situacao,
      DataInicio: params.DataInicio ?? this.DataInicio,
      HoraInicio: params.HoraInicio ?? this.HoraInicio,
      DataFinalizacao: params.DataFinalizacao ?? this.DataFinalizacao,
      HoraFinalizacao: params.HoraFinalizacao ?? this.HoraFinalizacao,
      CodUsuario: params.CodUsuario ?? this.CodUsuario,
      NomeUsuario: params.NomeUsuario ?? this.NomeUsuario,
    });
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoEstagioDto {
    return new ExpedicaoCarrinhoPercursoEstagioDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      Item: object.Item,
      CodPercursoEstagio: object.CodPercursoEstagio,
      CodCarrinho: object.CodCarrinho,
      Situacao: object.Situacao,
      DataInicio: object.DataInicio,
      HoraInicio: object.HoraInicio,
      DataFinalizacao: object.DataFinalizacao,
      HoraFinalizacao: object.HoraFinalizacao,
      CodUsuario: object.CodUsuario,
      NomeUsuario: object.NomeUsuario,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      Item: this.Item,
      CodPercursoEstagio: this.CodPercursoEstagio,
      CodCarrinho: this.CodCarrinho,
      Situacao: this.Situacao,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      DataFinalizacao: this.DataFinalizacao,
      HoraFinalizacao: this.HoraFinalizacao,
      CodUsuario: this.CodUsuario,
      NomeUsuario: this.NomeUsuario,
    };
  }
}
