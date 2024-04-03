export default class ExpedicaoArmazenagemDto {
  CodEmpresa: number;
  CodArmazenagem: number;
  NumeroDocumento?: string;
  Situacao: string;
  Origem: string;
  CodOrigem: number;
  CodPrioridade: number;
  DataLancamento: Date;
  HoraLancamento: string;
  CodUsuarioLancamento: number;
  NomeUsuarioLancamento: string;
  EstacaoLancamento: string;
  Observacao: string;

  constructor(params: {
    CodEmpresa: number;
    CodArmazenagem: number;
    NumeroDocumento?: string;
    Situacao: string;
    Origem: string;
    CodOrigem: number;
    CodPrioridade: number;
    DataLancamento: Date;
    HoraLancamento: string;
    CodUsuarioLancamento: number;
    NomeUsuarioLancamento: string;
    EstacaoLancamento: string;
    Observacao: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodArmazenagem = params.CodArmazenagem;
    this.NumeroDocumento = params.NumeroDocumento;
    this.Situacao = params.Situacao;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.CodPrioridade = params.CodPrioridade;
    this.DataLancamento = params.DataLancamento;
    this.HoraLancamento = params.HoraLancamento;
    this.CodUsuarioLancamento = params.CodUsuarioLancamento;
    this.NomeUsuarioLancamento = params.NomeUsuarioLancamento;
    this.EstacaoLancamento = params.EstacaoLancamento;
    this.Observacao = params.Observacao;
  }

  public copyWith(params: {
    CodEmpresa?: number;
    CodArmazenagem?: number;
    CodTipoOperacaoArmazenagem?: number;
    NumeroDocumento?: string;
    Situacao?: string;
    Origem?: string;
    CodOrigem?: number;
    CodPrioridade?: number;
    DataLancamento?: Date;
    HoraLancamento?: string;
    CodUsuarioLancamento?: number;
    NomeUsuarioLancamento?: string;
    EstacaoLancamento?: string;
    Observacao?: string;
  }): ExpedicaoArmazenagemDto {
    return new ExpedicaoArmazenagemDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenagem: params.CodArmazenagem ?? this.CodArmazenagem,
      NumeroDocumento: params.NumeroDocumento ?? this.NumeroDocumento,
      Situacao: params.Situacao ?? this.Situacao,
      Origem: params.Origem ?? this.Origem,
      CodOrigem: params.CodOrigem ?? this.CodOrigem,
      CodPrioridade: params.CodPrioridade ?? this.CodPrioridade,
      DataLancamento: params.DataLancamento ?? this.DataLancamento,
      HoraLancamento: params.HoraLancamento ?? this.HoraLancamento,
      CodUsuarioLancamento: params.CodUsuarioLancamento ?? this.CodUsuarioLancamento,
      NomeUsuarioLancamento: params.NomeUsuarioLancamento ?? this.NomeUsuarioLancamento,
      EstacaoLancamento: params.EstacaoLancamento ?? this.EstacaoLancamento,
      Observacao: params.Observacao ?? this.Observacao,
    });
  }

  public static fromObject(params: {
    CodEmpresa: number;
    CodArmazenagem: number;
    CodTipoOperacaoArmazenagem: number;
    NumeroDocumento?: string;
    Situacao: string;
    Origem: string;
    CodOrigem: number;
    CodPrioridade: number;
    DataLancamento: Date;
    HoraLancamento: string;
    CodUsuarioLancamento: number;
    NomeUsuarioLancamento: string;
    EstacaoLancamento: string;
    Observacao: string;
  }): ExpedicaoArmazenagemDto {
    return new ExpedicaoArmazenagemDto({
      CodEmpresa: params.CodEmpresa,
      CodArmazenagem: params.CodArmazenagem,
      NumeroDocumento: params.NumeroDocumento,
      Situacao: params.Situacao,
      Origem: params.Origem,
      CodOrigem: params.CodOrigem,
      CodPrioridade: params.CodPrioridade,
      DataLancamento: params.DataLancamento,
      HoraLancamento: params.HoraLancamento,
      CodUsuarioLancamento: params.CodUsuarioLancamento,
      NomeUsuarioLancamento: params.NomeUsuarioLancamento,
      EstacaoLancamento: params.EstacaoLancamento,
      Observacao: params.Observacao,
    });
  }

  public toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodArmazenagem: this.CodArmazenagem,
      NumeroDocumento: this.NumeroDocumento,
      Situacao: this.Situacao,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      CodPrioridade: this.CodPrioridade,
      DataLancamento: this.DataLancamento,
      HoraLancamento: this.HoraLancamento,
      CodUsuarioLancamento: this.CodUsuarioLancamento,
      NomeUsuarioLancamento: this.NomeUsuarioLancamento,
      EstacaoLancamento: this.EstacaoLancamento,
      Observacao: this.Observacao,
    };
  }
}
