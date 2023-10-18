export default class ExpedicaoSepararEstoqueCancelamentoDto {
  CodEmpresa: number;
  CodSepararEstoque: number;
  Situacao: string;
  CodMotivoCancelamento: number;
  DataCancelamento: Date;
  HoraCancelamento: string;
  CodUsuarioCancelamento: number;
  NomeUsuarioCancelamento: string;
  ObservacaoCancelament: string;

  constructor(params: {
    CodEmpresa: number;
    CodSepararEstoque: number;
    Situacao: string;
    CodMotivoCancelamento: number;
    DataCancelamento: Date;
    HoraCancelamento: string;
    CodUsuarioCancelamento: number;
    NomeUsuarioCancelamento: string;
    ObservacaoCancelament: string;
  }) {
    this.CodEmpresa = params.CodEmpresa;
    this.CodSepararEstoque = params.CodSepararEstoque;
    this.Situacao = params.Situacao;
    this.CodMotivoCancelamento = params.CodMotivoCancelamento;
    this.DataCancelamento = params.DataCancelamento;
    this.HoraCancelamento = params.HoraCancelamento;
    this.CodUsuarioCancelamento = params.CodUsuarioCancelamento;
    this.NomeUsuarioCancelamento = params.NomeUsuarioCancelamento;
    this.ObservacaoCancelament = params.ObservacaoCancelament;
  }
}
