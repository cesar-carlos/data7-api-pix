export default class ExpedicaoCarrinhoPercursoEstagioDto {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  Item: string;
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
    Item,
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
    Item?: string;
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
      Item: Item ?? this.Item,
      Situacao: Situacao ?? this.Situacao,
      DataInicio: DataInicio ?? this.DataInicio,
      HoraInicio: HoraInicio ?? this.HoraInicio,
      DataFinalizacao: DataFinalizacao ?? this.DataFinalizacao,
      HoraFinalizacao: HoraFinalizacao ?? this.HoraFinalizacao,
      CodUsuario: CodUsuario ?? this.CodUsuario,
      NomeUsuario: NomeUsuario ?? this.NomeUsuario,
    });
  }

  static fromJson(json: any): ExpedicaoCarrinhoPercursoEstagioDto {
    return new ExpedicaoCarrinhoPercursoEstagioDto({
      CodEmpresa: json.CodEmpresa,
      CodCarrinhoPercurso: json.CodCarrinhoPercurso,
      Item: json.Item,
      Situacao: json.Situacao,
      DataInicio: json.DataInicio,
      HoraInicio: json.HoraInicio,
      DataFinalizacao: json.DataFinalizacao,
      HoraFinalizacao: json.HoraFinalizacao,
      CodUsuario: json.CodUsuario,
      NomeUsuario: json.NomeUsuario,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      Item: this.Item,
      Situacao: this.Situacao,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      DataFinalizacao: this.DataFinalizacao,
      HoraFinalizacao: this.HoraFinalizacao,
      CodUsuario: this.CodUsuario,
      NomeUsuario: this.NomeUsuario,
    };
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoEstagioDto {
    return new ExpedicaoCarrinhoPercursoEstagioDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      Item: object.Item,
      Situacao: object.Situacao,
      DataInicio: object.DataInicio,
      HoraInicio: object.HoraInicio,
      DataFinalizacao: object.DataFinalizacao,
      HoraFinalizacao: object.HoraFinalizacao,
      CodUsuario: object.CodUsuario,
      NomeUsuario: object.NomeUsuario,
    });
  }
}
