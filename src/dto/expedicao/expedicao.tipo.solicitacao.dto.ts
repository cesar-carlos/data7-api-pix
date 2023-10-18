export default class ExpedicaoTipoSolicitacaoDto {
  CodTipoSolicitacao: number;
  Descricao: string;
  Ativo: string;

  constructor(params: { CodTipoSolicitacao: number; Descricao: string; Ativo: string }) {
    this.CodTipoSolicitacao = params.CodTipoSolicitacao;
    this.Descricao = params.Descricao;
    this.Ativo = params.Ativo;
  }

  static fromObject(object: any): ExpedicaoTipoSolicitacaoDto {
    return new ExpedicaoTipoSolicitacaoDto({
      CodTipoSolicitacao: object.CodTipoSolicitacao,
      Descricao: object.Descricao,
      Ativo: object.Ativo,
    });
  }
}
