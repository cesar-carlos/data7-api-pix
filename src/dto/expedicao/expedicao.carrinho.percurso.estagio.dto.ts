export default class ExpedicaoCarrinhoPercursoEstagioDto {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
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

  public copyWith({
    CodEmpresa,
    CodCarrinhoPercurso,
    CodPercursoEstagio,
    CodCarrinho,
    Situacao,
    DataInicio,
    HoraInicio,
    DataFinalizacao,
    HoraFinalizacao,
    CodUsuario,
    NomeUsuario,
  }: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    CodPercursoEstagio?: number;
    CodCarrinho?: number;
    Situacao?: string;
    DataInicio?: Date;
    HoraInicio?: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodUsuario?: number;
    NomeUsuario?: string;
  }) {
    return new ExpedicaoCarrinhoPercursoEstagioDto({
      CodEmpresa: CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: CodCarrinhoPercurso ? CodCarrinhoPercurso : this.CodCarrinhoPercurso,
      CodPercursoEstagio: CodPercursoEstagio ?? this.CodPercursoEstagio,
      CodCarrinho: CodCarrinho ?? this.CodCarrinho,
      Situacao: Situacao ?? this.Situacao,
      DataInicio: DataInicio ?? this.DataInicio,
      HoraInicio: HoraInicio ?? this.HoraInicio,
      DataFinalizacao: DataFinalizacao ?? this.DataFinalizacao,
      HoraFinalizacao: HoraFinalizacao ?? this.HoraFinalizacao,
      CodUsuario: CodUsuario ?? this.CodUsuario,
      NomeUsuario: NomeUsuario ?? this.NomeUsuario,
    });
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoEstagioDto {
    return new ExpedicaoCarrinhoPercursoEstagioDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
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
