export default class ExpedicaoArmazenarDto {
  CodEmpresa: number;
  CodArmazenar: number;
  NumeroDocumento?: string;
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
    CodArmazenar: number;
    NumeroDocumento?: string;
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
    this.CodArmazenar = params.CodArmazenar;
    this.NumeroDocumento = params.NumeroDocumento;
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
    CodArmazenar?: number;
    CodTipoOperacaoArmazenar?: number;
    NumeroDocumento?: string;
    Origem?: string;
    CodOrigem?: number;
    CodPrioridade?: number;
    DataLancamento?: Date;
    HoraLancamento?: string;
    CodUsuarioLancamento?: number;
    NomeUsuarioLancamento?: string;
    EstacaoLancamento?: string;
    Observacao?: string;
  }): ExpedicaoArmazenarDto {
    return new ExpedicaoArmazenarDto({
      CodEmpresa: params.CodEmpresa ?? this.CodEmpresa,
      CodArmazenar: params.CodArmazenar ?? this.CodArmazenar,
      NumeroDocumento: params.NumeroDocumento ?? this.NumeroDocumento,
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
    CodArmazenar: number;
    CodTipoOperacaoArmazenar: number;
    NumeroDocumento?: string;
    Origem: string;
    CodOrigem: number;
    CodPrioridade: number;
    DataLancamento: Date;
    HoraLancamento: string;
    CodUsuarioLancamento: number;
    NomeUsuarioLancamento: string;
    EstacaoLancamento: string;
    Observacao: string;
  }): ExpedicaoArmazenarDto {
    return new ExpedicaoArmazenarDto({
      CodEmpresa: params.CodEmpresa,
      CodArmazenar: params.CodArmazenar,
      NumeroDocumento: params.NumeroDocumento,
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
      CodArmazenar: this.CodArmazenar,
      NumeroDocumento: this.NumeroDocumento,
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
