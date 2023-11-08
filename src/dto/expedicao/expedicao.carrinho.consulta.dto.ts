export default class ExpedicaoCarrinhoConsultaDto {
  CodEmpresa: number;
  CodCarrinho: number;
  Descricao: string;
  Ativo: 'S' | 'N';
  Situacao: string;
  CodigoBarras: string;
  CodCarrinhoPercurso: number;
  Item: string;
  Origem: string;
  CodOrigem: number;
  DataInicio: Date;
  HoraInicio: string;
  CodUsuario: number;
  NomeUsuario: string;
  CodSetorEstoque: number;
  NomeSetorEstoque: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinho: number;
    Descricao: string;
    Ativo: 'S' | 'N';
    Situacao: string;
    CodigoBarras: string;
    CodCarrinhoPercurso: number;
    Item: string;
    Origem: string;
    CodOrigem: number;
    DataInicio: Date;
    HoraInicio: string;
    CodUsuario: number;
    NomeUsuario: string;
    CodSetorEstoque: number;
    NomeSetorEstoque: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinho = params.CodCarrinho;
    this.Descricao = params.Descricao;
    this.Ativo = params.Ativo;
    this.Situacao = params.Situacao;
    this.CodigoBarras = params.CodigoBarras;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.Item = params.Item;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.DataInicio = params.DataInicio;
    this.HoraInicio = params.HoraInicio;
    this.CodUsuario = params.CodUsuario;
    this.NomeUsuario = params.NomeUsuario;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NomeSetorEstoque = params.NomeSetorEstoque;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodCarrinho?: number;
    Descricao?: string;
    Ativo?: 'S' | 'N';
    Situacao?: string;
    CodigoBarras?: string;
    CodCarrinhoPercurso?: number;
    Item?: string;
    Origem?: string;
    CodOrigem?: number;
    DataInicio?: Date;
    HoraInicio?: string;
    CodUsuario?: number;
    NomeUsuario?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
  }) {
    return new ExpedicaoCarrinhoConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      Descricao: params.Descricao ?? this.Descricao,
      Ativo: params.Ativo ?? this.Ativo,
      Situacao: params.Situacao ?? this.Situacao,
      CodigoBarras: params.CodigoBarras ?? this.CodigoBarras,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      Item: params.Item ?? this.Item,
      Origem: params.Origem ?? this.Origem,
      CodOrigem: params.CodOrigem ?? this.CodOrigem,
      DataInicio: params.DataInicio ?? this.DataInicio,
      HoraInicio: params.HoraInicio ?? this.HoraInicio,
      CodUsuario: params.CodUsuario ?? this.CodUsuario,
      NomeUsuario: params.NomeUsuario ?? this.NomeUsuario,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      NomeSetorEstoque: params.NomeSetorEstoque ?? this.NomeSetorEstoque,
    });
  }

  static fromJson(json: any): ExpedicaoCarrinhoConsultaDto {
    return new ExpedicaoCarrinhoConsultaDto({
      CodEmpresa: json.CodEmpresa,
      CodCarrinho: json.CodCarrinho,
      Descricao: json.Descricao,
      Ativo: json.Ativo,
      Situacao: json.Situacao,
      CodigoBarras: json.CodigoBarras,
      CodCarrinhoPercurso: json.CodCarrinhoPercurso,
      Item: json.Item,
      Origem: json.Origem,
      CodOrigem: json.CodOrigem,
      DataInicio: json.DataInicio,
      HoraInicio: json.HoraInicio,
      CodUsuario: json.CodUsuario,
      NomeUsuario: json.NomeUsuario,
      CodSetorEstoque: json.CodSetorEstoque,
      NomeSetorEstoque: json.NomeSetorEstoque,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinho: this.CodCarrinho,
      Descricao: this.Descricao,
      Ativo: this.Ativo,
      Situacao: this.Situacao,
      CodigoBarras: this.CodigoBarras,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      Item: this.Item,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      CodUsuario: this.CodUsuario,
      NomeUsuario: this.NomeUsuario,
      CodSetorEstoque: this.CodSetorEstoque,
      NomeSetorEstoque: this.NomeSetorEstoque,
    };
  }

  static fromObject(object: any): ExpedicaoCarrinhoConsultaDto {
    return new ExpedicaoCarrinhoConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinho: object.CodCarrinho,
      Descricao: object.Descricao,
      Ativo: object.Ativo,
      Situacao: object.Situacao,
      CodigoBarras: object.CodigoBarras,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      Item: object.Item,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      DataInicio: object.DataInicio,
      HoraInicio: object.HoraInicio,
      CodUsuario: object.CodUsuario,
      NomeUsuario: object.NomeUsuario,
      CodSetorEstoque: object.CodSetorEstoque,
      NomeSetorEstoque: object.NomeSetorEstoque,
    });
  }
}
