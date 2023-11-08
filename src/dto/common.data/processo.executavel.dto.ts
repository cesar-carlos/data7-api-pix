export default class ProcessoExecutavelDto {
  CodProcessoExecutavel: number;
  CodEmpresa: number;
  CodFilial: number;
  Status: string;
  Origem: string;
  CodOrigem: number;
  ItemOrigem: string;
  DataAbertura: Date;
  CodUsuario: number;
  NomeUsuario: string;
  CodContaFinanceira: string;
  CodPeriodoCaixa: number;
  StatusPeriodoCaixa: string;
  NomeComputador: string;
  UsuarioWindows: string;
  BancoDados: string;

  constructor(params: {
    CodProcessoExecutavel: number;
    CodEmpresa: number;
    CodFilial: number;
    Status: string;
    Origem: string;
    CodOrigem: number;
    ItemOrigem: string;
    DataAbertura: Date;
    CodUsuario: number;
    NomeUsuario: string;
    CodContaFinanceira: string;
    CodPeriodoCaixa: number;
    StatusPeriodoCaixa: string;
    NomeComputador: string;
    UsuarioWindows: string;
    BancoDados: string;
  }) {
    this.CodProcessoExecutavel = params.CodProcessoExecutavel;
    this.CodEmpresa = params.CodEmpresa;
    this.CodFilial = params.CodFilial;
    this.Status = params.Status;
    this.Origem = params.Origem;
    this.CodOrigem = params.CodOrigem;
    this.ItemOrigem = params.ItemOrigem;
    this.DataAbertura = params.DataAbertura;
    this.CodUsuario = params.CodUsuario;
    this.NomeUsuario = params.NomeUsuario;
    this.CodContaFinanceira = params.CodContaFinanceira;
    this.CodPeriodoCaixa = params.CodPeriodoCaixa;
    this.StatusPeriodoCaixa = params.StatusPeriodoCaixa;
    this.NomeComputador = params.NomeComputador;
    this.UsuarioWindows = params.UsuarioWindows;
    this.BancoDados = params.BancoDados;
  }

  static fromObject(object: any): ProcessoExecutavelDto {
    return new ProcessoExecutavelDto({
      CodProcessoExecutavel: object.CodProcessoExecutavel,
      CodEmpresa: object.CodEmpresa,
      CodFilial: object.CodFilial,
      Status: object.Status,
      Origem: object.Origem,
      CodOrigem: object.CodOrigem,
      ItemOrigem: object.ItemOrigem,
      DataAbertura: object.DataAbertura,
      CodUsuario: object.CodUsuario,
      NomeUsuario: object.NomeUsuario,
      CodContaFinanceira: object.CodContaFinanceira,
      CodPeriodoCaixa: object.CodPeriodoCaixa,
      StatusPeriodoCaixa: object.StatusPeriodoCaixa,
      NomeComputador: object.NomeComputador,
      UsuarioWindows: object.UsuarioWindows,
      BancoDados: object.BancoDados,
    });
  }

  copyWith({
    CodProcessoExecutavel,
    CodEmpresa,
    CodFilial,
    Status,
    Origem,
    CodOrigem,
    ItemOrigem,
    DataAbertura,
    CodUsuario,
    NomeUsuario,
    CodContaFinanceira,
    CodPeriodoCaixa,
    StatusPeriodoCaixa,
    NomeComputador,
    UsuarioWindows,
    BancoDados,
  }: {
    CodProcessoExecutavel?: number;
    CodEmpresa?: number;
    CodFilial?: number;
    Status?: string;
    Origem?: string;
    CodOrigem?: number;
    ItemOrigem?: string;
    DataAbertura?: Date;
    CodUsuario?: number;
    NomeUsuario?: string;
    CodContaFinanceira?: string;
    CodPeriodoCaixa?: number;
    StatusPeriodoCaixa?: string;
    NomeComputador?: string;
    UsuarioWindows?: string;
    BancoDados?: string;
  }) {
    return new ProcessoExecutavelDto({
      CodProcessoExecutavel: CodProcessoExecutavel ?? this.CodProcessoExecutavel,
      CodEmpresa: CodEmpresa ?? this.CodEmpresa,
      CodFilial: CodFilial ?? this.CodFilial,
      Status: Status ?? this.Status,
      Origem: Origem ?? this.Origem,
      CodOrigem: CodOrigem ?? this.CodOrigem,
      ItemOrigem: ItemOrigem ?? this.ItemOrigem,
      DataAbertura: DataAbertura ?? this.DataAbertura,
      CodUsuario: CodUsuario ?? this.CodUsuario,
      NomeUsuario: NomeUsuario ?? this.NomeUsuario,
      CodContaFinanceira: CodContaFinanceira ?? this.CodContaFinanceira,
      CodPeriodoCaixa: CodPeriodoCaixa ?? this.CodPeriodoCaixa,
      StatusPeriodoCaixa: StatusPeriodoCaixa ?? this.StatusPeriodoCaixa,
      NomeComputador: NomeComputador ?? this.NomeComputador,
      UsuarioWindows: UsuarioWindows ?? this.UsuarioWindows,
      BancoDados: BancoDados ?? this.BancoDados,
    });
  }
}
