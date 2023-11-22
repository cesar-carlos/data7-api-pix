export default class ExpedicaoSepararConsultaDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  CodTipoOperacaoExpedicao: number;
  NomeTipoOperacaoExpedicao: string;
  Situacao: string;
  TipoEntidade: string;
  DataEmissao: Date;
  HoraEmissao: string;
  CodEntidade: number;
  NomeEntidade: string;
  CodPrioridade: number;
  NomePrioridade: string;
  Historico?: string;
  Observacao?: string;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    CodTipoOperacaoExpedicao: number;
    NomeTipoOperacaoExpedicao: string;
    Situacao: string;
    TipoEntidade: string;
    DataEmissao: Date;
    HoraEmissao: string;
    CodEntidade: number;
    NomeEntidade: string;
    CodPrioridade: number;
    NomePrioridade: string;
    Historico?: string;
    Observacao?: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.CodTipoOperacaoExpedicao = params.CodTipoOperacaoExpedicao;
    this.NomeTipoOperacaoExpedicao = params.NomeTipoOperacaoExpedicao;
    this.Situacao = params.Situacao;
    this.TipoEntidade = params.TipoEntidade;
    this.DataEmissao = params.DataEmissao;
    this.HoraEmissao = params.HoraEmissao;
    this.CodEntidade = params.CodEntidade;
    this.NomeEntidade = params.NomeEntidade;
    this.CodPrioridade = params.CodPrioridade;
    this.NomePrioridade = params.NomePrioridade;
    this.Historico = params?.Historico;
    this.Observacao = params?.Observacao;
  }

  static fromObject(object: any): ExpedicaoSepararConsultaDto {
    return new ExpedicaoSepararConsultaDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      CodTipoOperacaoExpedicao: object.CodTipoOperacaoExpedicao,
      NomeTipoOperacaoExpedicao: object.NomeTipoOperacaoExpedicao,
      Situacao: object.Situacao,
      TipoEntidade: object.TipoEntidade,
      DataEmissao: object.DataEmissao,
      HoraEmissao: object.HoraEmissao,
      CodEntidade: object.CodEntidade,
      NomeEntidade: object.NomeEntidade,
      CodPrioridade: object.CodPrioridade,
      NomePrioridade: object.NomePrioridade,
      Historico: object?.Historico,
      Observacao: object?.Observacao,
    });
  }

  toJson(): any {
    return {
      CodEmpresa: this.CodEmpresa,
      CodSepararEstoque: this.CodSepararEstoque,
      CodTipoOperacaoExpedicao: this.CodTipoOperacaoExpedicao,
      NomeTipoOperacaoExpedicao: this.NomeTipoOperacaoExpedicao,
      Situacao: this.Situacao,
      TipoEntidade: this.TipoEntidade,
      DataEmissao: this.DataEmissao,
      HoraEmissao: this.HoraEmissao,
      CodEntidade: this.CodEntidade,
      NomeEntidade: this.NomeEntidade,
      CodPrioridade: this.CodPrioridade,
      NomePrioridade: this.NomePrioridade,
      Historico: this.Historico,
      Observacao: this.Observacao,
    };
  }
}