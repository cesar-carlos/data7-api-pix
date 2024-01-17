export default class ExpedicaoCarrinhoPercursoConsultaDto {
  CodEmpresa: number;
  CodCarrinhoPercurso: number;
  Item: string;
  CodPercursoEstagio: number;
  Origem: string;
  CodOrigem: number;
  Situacao: string;
  CodCarrinho: number;
  NomeCarrinho: string;
  CodigoBarrasCarrinho: string;
  Ativo: string;
  DataInicio: Date;
  HoraInicio: string;
  CodUsuarioInicio: number;
  NomeUsuarioInicio: string;
  DataFinalizacao?: Date;
  HoraFinalizacao?: string;
  CodSetorEstoque?: number;
  NomeSetorEstoque?: string;
  CodCancelamento?: number;
  CodMotivoCancelamento?: number;
  DescricaoMotivoCancelamento?: string;
  DataCancelamento?: Date;
  HoraCancelamento?: string;
  CodUsuarioCancelamento?: number;
  NomeUsuarioCancelamento?: string;
  ObservacaoCancelamento?: string;

  constructor(params: {
    CodEmpresa: number;
    CodCarrinhoPercurso: number;
    Item: string;
    CodPercursoEstagio: number;
    Origem: string;
    CodOrigem: number;
    Situacao: string;
    CodCarrinho: number;
    NomeCarrinho: string;
    CodigoBarrasCarrinho: string;
    Ativo: string;
    DataInicio: Date;
    HoraInicio: string;
    CodUsuarioInicio: number;
    NomeUsuarioInicio: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    CodCancelamento?: number;
    CodMotivoCancelamento?: number;
    DescricaoMotivoCancelamento?: string;
    DataCancelamento?: Date;
    HoraCancelamento?: string;
    CodUsuarioCancelamento?: number;
    NomeUsuarioCancelamento?: string;
    ObservacaoCancelamento?: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodCarrinhoPercurso = params.CodCarrinhoPercurso;
    this.Item = params.Item;
    this.CodPercursoEstagio = params.CodPercursoEstagio;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.Situacao = params.Situacao;
    this.CodCarrinho = params.CodCarrinho;
    this.NomeCarrinho = params.NomeCarrinho;
    this.CodigoBarrasCarrinho = params.CodigoBarrasCarrinho;
    this.Ativo = params.Ativo;
    this.DataInicio = params.DataInicio;
    this.HoraInicio = params.HoraInicio;
    this.CodUsuarioInicio = params.CodUsuarioInicio;
    this.NomeUsuarioInicio = params.NomeUsuarioInicio;
    this.DataFinalizacao = params.DataFinalizacao;
    this.HoraFinalizacao = params.HoraFinalizacao;
    this.CodSetorEstoque = params.CodSetorEstoque;
    this.NomeSetorEstoque = params.NomeSetorEstoque;
    this.CodCancelamento = params.CodCancelamento;
    this.CodMotivoCancelamento = params.CodMotivoCancelamento;
    this.DescricaoMotivoCancelamento = params.DescricaoMotivoCancelamento;
    this.DataCancelamento = params.DataCancelamento;
    this.HoraCancelamento = params.HoraCancelamento;
    this.CodUsuarioCancelamento = params.CodUsuarioCancelamento;
    this.NomeUsuarioCancelamento = params.NomeUsuarioCancelamento;
    this.ObservacaoCancelamento = params.ObservacaoCancelamento;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodCarrinhoPercurso?: number;
    Item?: string;
    CodPercursoEstagio?: number;
    Origem?: string;
    CodOrigem?: number;
    Situacao?: string;
    CodCarrinho?: number;
    NomeCarrinho?: string;
    CodigoBarrasCarrinho?: string;
    Ativo?: string;
    DataInicio?: Date;
    HoraInicio?: string;
    CodUsuarioInicio?: number;
    NomeUsuarioInicio?: string;
    DataFinalizacao?: Date;
    HoraFinalizacao?: string;
    CodSetorEstoque?: number;
    NomeSetorEstoque?: string;
    CodCancelamento?: number;
    CodMotivoCancelamento?: number;
    DescricaoMotivoCancelamento?: string;
    DataCancelamento?: Date;
    HoraCancelamento?: string;
    CodUsuarioCancelamento?: number;
    NomeUsuarioCancelamento?: string;
    ObservacaoCancelamento?: string;
  }) {
    return new ExpedicaoCarrinhoPercursoConsultaDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodCarrinhoPercurso: params.CodCarrinhoPercurso ?? this.CodCarrinhoPercurso,
      Item: params.Item ?? this.Item,
      CodPercursoEstagio: params.CodPercursoEstagio ?? this.CodPercursoEstagio,
      Origem: params.Origem ?? this.Origem,
      CodOrigem: params.CodOrigem ?? this.CodOrigem,
      Situacao: params.Situacao ?? this.Situacao,
      CodCarrinho: params.CodCarrinho ?? this.CodCarrinho,
      NomeCarrinho: params.NomeCarrinho ?? this.NomeCarrinho,
      CodigoBarrasCarrinho: params.CodigoBarrasCarrinho ?? this.CodigoBarrasCarrinho,
      Ativo: params.Ativo ?? this.Ativo,
      DataInicio: params.DataInicio ?? this.DataInicio,
      HoraInicio: params.HoraInicio ?? this.HoraInicio,
      CodUsuarioInicio: params.CodUsuarioInicio ?? this.CodUsuarioInicio,
      NomeUsuarioInicio: params.NomeUsuarioInicio ?? this.NomeUsuarioInicio,
      DataFinalizacao: params.DataFinalizacao ?? this.DataFinalizacao,
      HoraFinalizacao: params.HoraFinalizacao ?? this.HoraFinalizacao,
      CodSetorEstoque: params.CodSetorEstoque ?? this.CodSetorEstoque,
      NomeSetorEstoque: params.NomeSetorEstoque ?? this.NomeSetorEstoque,
      CodCancelamento: params.CodCancelamento ?? this.CodCancelamento,
      CodMotivoCancelamento: params.CodMotivoCancelamento ?? this.CodMotivoCancelamento,
      DescricaoMotivoCancelamento: params.DescricaoMotivoCancelamento ?? this.DescricaoMotivoCancelamento,
      DataCancelamento: params.DataCancelamento ?? this.DataCancelamento,
      HoraCancelamento: params.HoraCancelamento ?? this.HoraCancelamento,
      CodUsuarioCancelamento: params.CodUsuarioCancelamento ?? this.CodUsuarioCancelamento,
      NomeUsuarioCancelamento: params.NomeUsuarioCancelamento ?? this.NomeUsuarioCancelamento,
      ObservacaoCancelamento: params.ObservacaoCancelamento ?? this.ObservacaoCancelamento,
    });
  }

  static fromObject(object: any): ExpedicaoCarrinhoPercursoConsultaDto {
    return new ExpedicaoCarrinhoPercursoConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodCarrinhoPercurso: object.CodCarrinhoPercurso,
      Item: object.Item,
      CodPercursoEstagio: object.CodPercursoEstagio,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      Situacao: object.Situacao,
      CodCarrinho: object.CodCarrinho,
      NomeCarrinho: object.NomeCarrinho,
      CodigoBarrasCarrinho: object.CodigoBarrasCarrinho,
      Ativo: object.Ativo,
      DataInicio: object.DataInicio,
      HoraInicio: object.HoraInicio,
      CodUsuarioInicio: object.CodUsuarioInicio,
      NomeUsuarioInicio: object.NomeUsuarioInicio,
      DataFinalizacao: object.DataFinalizacao,
      HoraFinalizacao: object.HoraFinalizacao,
      CodSetorEstoque: object.CodSetorEstoque,
      NomeSetorEstoque: object.NomeSetorEstoque,
      CodCancelamento: object.CodCancelamento,
      CodMotivoCancelamento: object.CodMotivoCancelamento,
      DescricaoMotivoCancelamento: object.DescricaoMotivoCancelamento,
      DataCancelamento: object.DataCancelamento,
      HoraCancelamento: object.HoraCancelamento,
      CodUsuarioCancelamento: object.CodUsuarioCancelamento,
      NomeUsuarioCancelamento: object.NomeUsuarioCancelamento,
      ObservacaoCancelamento: object.ObservacaoCancelamento,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodCarrinhoPercurso: this.CodCarrinhoPercurso,
      Item: this.Item,
      CodPercursoEstagio: this.CodPercursoEstagio,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      Situacao: this.Situacao,
      CodCarrinho: this.CodCarrinho,
      NomeCarrinho: this.NomeCarrinho,
      CodigoBarrasCarrinho: this.CodigoBarrasCarrinho,
      Ativo: this.Ativo,
      DataInicio: this.DataInicio,
      HoraInicio: this.HoraInicio,
      CodUsuarioInicio: this.CodUsuarioInicio,
      NomeUsuarioInicio: this.NomeUsuarioInicio,
      DataFinalizacao: this.DataFinalizacao,
      HoraFinalizacao: this.HoraFinalizacao,
      CodSetorEstoque: this.CodSetorEstoque,
      NomeSetorEstoque: this.NomeSetorEstoque,
      CodCancelamento: this.CodCancelamento,
      CodMotivoCancelamento: this.CodMotivoCancelamento ?? null,
      DescricaoMotivoCancelamento: this.DescricaoMotivoCancelamento ?? null,
      DataCancelamento: this.DataCancelamento ?? null,
      HoraCancelamento: this.HoraCancelamento ?? null,
      CodUsuarioCancelamento: this.CodUsuarioCancelamento ?? null,
      NomeUsuarioCancelamento: this.NomeUsuarioCancelamento ?? null,
      ObservacaoCancelamento: this.ObservacaoCancelamento ?? null,
    };
  }
}
