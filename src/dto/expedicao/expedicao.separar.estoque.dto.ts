export default class ExpedicaoSepararEstoqueDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  CodTipoOperacaoExpedicao: number;
  TipoEntidade: string;
  CodEntidade: number;
  NomeEntidade: string;
  Situacao: string;
  Data: Date;
  Hora: string;
  CodPrioridade: number;
  Historico?: string;
  Observacao?: string;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    CodTipoOperacaoExpedicao: number;
    TipoEntidade: string;
    CodEntidade: number;
    NomeEntidade: string;
    Situacao: string;
    Data: Date;
    Hora: string;
    CodPrioridade: number;
    Historico?: string;
    Observacao?: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.CodTipoOperacaoExpedicao = params.CodTipoOperacaoExpedicao;
    this.TipoEntidade = params.TipoEntidade;
    this.CodEntidade = params.CodEntidade;
    this.NomeEntidade = params.NomeEntidade;
    this.Situacao = params.Situacao;
    this.Data = params.Data;
    this.Hora = params.Hora;
    this.CodPrioridade = params.CodPrioridade;
    this.Historico = params?.Historico;
    this.Observacao = params?.Observacao;
  }

  static fromObject(object: any): ExpedicaoSepararEstoqueDto {
    return new ExpedicaoSepararEstoqueDto({
      CodEmpresa: object.CodEmpresa,
      CodSepararEstoque: object.CodSepararEstoque,
      CodTipoOperacaoExpedicao: object.CodTipoOperacaoExpedicao,
      TipoEntidade: object.TipoEntidade,
      CodEntidade: object.CodEntidade,
      NomeEntidade: object.NomeEntidade,
      Situacao: object.Situacao,
      Data: object.Data,
      Hora: object.Hora,
      CodPrioridade: object.CodPrioridade,
      Historico: object?.Historico,
      Observacao: object?.Observacao,
    });
  }
}
