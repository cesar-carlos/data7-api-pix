export default class ExpedicaoCarrinhoPercursoConsultaDto {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  Item: string;
  Origem: string;
  CodOrigem: number;
  Situacao: string;
  CodCarrinho: number;
  NomeCarrinho: string;
  CodigoBarrasCarrinho: string;
  Ativo: string;
  DataInicio?: Date;
  HoraInicio?: string;
  DataFinalizacao?: Date;
  HoraFinalizacao?: string;
  CodUsuario?: number;
  NomeUsuario?: string;
  CodSetorEstoque?: number;
  NomeSetorEstoque?: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinhoPercurso: number;
    Item: string;
    Origem: string;
    CodOrigem: number;
    Situacao: string;
    CodCarrinho: number;
    NomeCarrinho: string;
    CodigoBarrasCarrinho: string;
    Ativo: string;
    DataInicio?: Date;
    HoraInicio?: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodUsuario?: number;
    NomeUsuario?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.Item = params.Item;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.Situacao = params.Situacao;
    this.CodCarrinho = params.CodCarrinho;
    this.NomeCarrinho = params.NomeCarrinho;
    this.CodigoBarrasCarrinho = params.CodigoBarrasCarrinho;
    this.Ativo = params.Ativo;
    this.DataInicio = params.DataInicio;
    this.HoraInicio = params.HoraInicio;
    this.DataFinalizacao = params.DataFinalizacao;
    this.HoraFinalizacao = params.HoraFinalizacao;
    this.CodUsuario = params.CodUsuario;
    this.NomeUsuario = params.NomeUsuario;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NomeSetorEstoque = params.NomeSetorEstoque;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    Item?: string;
    Origem?: string;
    CodOrigem?: number;
    Situacao?: string;
    CodCarrinho?: number;
    NomeCarrinho?: string;
    CodigoBarrasCarrinho?: string;
    Ativo?: string;
    DataInicio?: Date;
    HoraInicio?: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodUsuario?: number;
    NomeUsuario?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
  }) {
    return new ExpedicaoCarrinhoPercursoConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      Item: params.Item ?? this.Item,
      Origem: params.Origem ?? this.Origem,
      CodOrigem: params.CodOrigem ?? this.CodOrigem,
      Situacao: params.Situacao ?? this.Situacao,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      NomeCarrinho: params.NomeCarrinho ?? this.NomeCarrinho,
      CodigoBarrasCarrinho: params.CodigoBarrasCarrinho ?? this.CodigoBarrasCarrinho,
      Ativo: params.Ativo ?? this.Ativo,
      DataInicio: params.DataInicio ?? this.DataInicio,
      HoraInicio: params.HoraInicio ?? this.HoraInicio,
      DataFinalizacao: params.DataFinalizacao ?? this.DataFinalizacao,
      HoraFinalizacao: params.HoraFinalizacao ?? this.HoraFinalizacao,
      CodUsuario: params.CodUsuario ?? this.CodUsuario,
      NomeUsuario: params.NomeUsuario ?? this.NomeUsuario,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      NomeSetorEstoque: params.NomeSetorEstoque ?? this.NomeSetorEstoque,
    });
  }

  public fromJson(json: any): ExpedicaoCarrinhoPercursoConsultaDto {
    return new ExpedicaoCarrinhoPercursoConsultaDto({
      CodEmpresa: json.CodEmpresa,
      CodCarrinhoPercurso: json.CodCarrinhoPercurso,
      Item: json.Item,
      Origem: json.Origem,
      CodOrigem: json.CodOrigem,
      Situacao: json.Situacao,
      CodCarrinho: json.CodCarrinho,
      NomeCarrinho: json.NomeCarrinho,
      CodigoBarrasCarrinho: json.CodigoBarrasCarrinho,
      Ativo: json.Ativo,
      DataInicio: json.DataInicio,
      HoraInicio: json.HoraInicio,
      DataFinalizacao: json.DataFinalizacao,
      HoraFinalizacao: json.HoraFinalizacao,
      CodUsuario: json.CodUsuario,
      NomeUsuario: json.NomeUsuario,
      CodSetorEstoque: json.CodSetorEstoque,
      NomeSetorEstoque: json.NomeSetorEstoque,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      Item: this.Item,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      Situacao: this.Situacao,
      CodCarrinho: this.CodCarrinho,
      NomeCarrinho: this.NomeCarrinho,
      CodigoBarrasCarrinho: this.CodigoBarrasCarrinho,
      Ativo: this.Ativo,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      DataFinalizacao: this.DataFinalizacao,
      HoraFinalizacao: this.HoraFinalizacao,
      CodUsuario: this.CodUsuario,
      NomeUsuario: this.NomeUsuario,
      CodSetorEstoque: this.CodSetorEstoque,
      NomeSetorEstoque: this.NomeSetorEstoque,
    };
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoConsultaDto {
    return new ExpedicaoCarrinhoPercursoConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      Item: object.Item,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      Situacao: object.Situacao,
      CodCarrinho: object.CodCarrinho,
      NomeCarrinho: object.NomeCarrinho,
      CodigoBarrasCarrinho: object.CodigoBarrasCarrinho,
      Ativo: object.Ativo,
      DataInicio: object.DataInicio,
      HoraInicio: object.HoraInicio,
      DataFinalizacao: object.DataFinalizacao,
      HoraFinalizacao: object.HoraFinalizacao,
      CodUsuario: object.CodUsuario,
      NomeUsuario: object.NomeUsuario,
      CodSetorEstoque: object.CodSetorEstoque,
      NomeSetorEstoque: object.NomeSetorEstoque,
    });
  }
}
