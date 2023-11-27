export default class ProcessoExecutavelDto {
  CodProcessoExecutavel: number;
  CodEmpresa: number;
  CodFilial: number;
  Status: string;
  Contexto: string;
  Origem: string;
  CodOrigem: number;
  ItemOrigem: string;
  DataAbertura: Date;
  CodUsuario: number;
  NomeUsuario: string;
  CodContaFinanceira: string;
  CodPeriodoCaixa: number;
  StatusPeriodoCaixa: string;
  UsuarioWindows: string;
  NomeComputador: string;
  BancoDados: string;

  constructor(params: {
    CodProcessoExecutavel: number;
    CodEmpresa: number;
    CodFilial: number;
    Status: string;
    Contexto: string;
    Origem: string;
    CodOrigem: number;
    ItemOrigem: string;
    DataAbertura: Date;
    CodUsuario: number;
    NomeUsuario: string;
    CodContaFinanceira: string;
    CodPeriodoCaixa: number;
    StatusPeriodoCaixa: string;
    UsuarioWindows: string;
    NomeComputador: string;
    BancoDados: string;
  }) {
    this.CodProcessoExecutavel = params.CodProcessoExecutavel;
    this.CodEmpresa = params.CodEmpresa;
    this.CodFilial = params.CodFilial;
    this.Status = params.Status;
    this.Contexto = params.Contexto;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.ItemOrigem = params.ItemOrigem;
    this.DataAbertura = params.DataAbertura;
    this.CodUsuario = params.CodUsuario;
    this.NomeUsuario = params.NomeUsuario;
    this.CodContaFinanceira = params.CodContaFinanceira;
    this.CodPeriodoCaixa = params.CodPeriodoCaixa;
    this.StatusPeriodoCaixa = params.StatusPeriodoCaixa;
    this.UsuarioWindows = params.UsuarioWindows;
    this.NomeComputador = params.NomeComputador;
    this.BancoDados = params.BancoDados;
  }

  static fromObject(object: any): ProcessoExecutavelDto {
    return new ProcessoExecutavelDto({
      CodProcessoExecutavel: object.CodProcessoExecutavel,
      CodEmpresa: object.CodEmpresa,
      CodFilial: object.CodFilial,
      Status: object.Status,
      Contexto: object.Contexto,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      ItemOrigem: object.ItemOrigem,
      DataAbertura: object.DataAbertura,
      CodUsuario: object.CodUsuario,
      NomeUsuario: object.NomeUsuario,
      CodContaFinanceira: object.CodContaFinanceira,
      CodPeriodoCaixa: object.CodPeriodoCaixa,
      StatusPeriodoCaixa: object.StatusPeriodoCaixa,
      UsuarioWindows: object.UsuarioWindows,
      NomeComputador: object.NomeComputador,
      BancoDados: object.BancoDados,
    });
  }

  public toJson(): any {
    return {
      CodProcessoExecutavel: this.CodProcessoExecutavel,
      CodEmpresa: this.CodEmpresa,
      CodFilial: this.CodFilial,
      Status: this.Status,
      Contexto: this.Contexto,
      Origem: this.Origem,
      CodOrigem: this.CodOrigem,
      ItemOrigem: this.ItemOrigem,
      DataAbertura: this.DataAbertura,
      CodUsuario: this.CodUsuario,
      NomeUsuario: this.NomeUsuario,
      CodContaFinanceira: this.CodContaFinanceira,
      CodPeriodoCaixa: this.CodPeriodoCaixa,
      StatusPeriodoCaixa: this.StatusPeriodoCaixa,
      UsuarioWindows: this.UsuarioWindows,
      NomeComputador: this.NomeComputador,
      BancoDados: this.BancoDados,
    };
  }
}
