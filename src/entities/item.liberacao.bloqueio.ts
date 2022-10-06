export default class ItemLiberacaoBloqueio {
  readonly codLiberacaoBloqueio: number;
  readonly item: string;
  readonly status: string;
  readonly codRegra: number;
  readonly regra: string;
  readonly mensagemBloqueio: string;
  readonly descricaoBloqueio: string;
  readonly observacaoBloqueio: string;
  readonly dataHoraSolicitacao: Date;
  readonly codUsuarioSolicitacao: number;
  readonly nomeUsuarioSolicitacao: string;
  readonly estacaoTrabalhoSolicitacao: string;
  readonly observacaoLiberacaoBloqueio: string;
  readonly motivoRejeicaoLiberacaoBloqueio: string;

  constructor(params: {
    codLiberacaoBloqueio: number;
    item: string;
    status: string;
    codRegra: number;
    regra: string;
    mensagemBloqueio: string;
    descricaoBloqueio: string;
    observacaoBloqueio: string;
    dataHoraSolicitacao: Date;
    codUsuarioSolicitacao: number;
    nomeUsuarioSolicitacao: string;
    estacaoTrabalhoSolicitacao: string;
    observacaoLiberacaoBloqueio: string;
    motivoRejeicaoLiberacaoBloqueio: string;
  }) {
    this.codLiberacaoBloqueio = params.codLiberacaoBloqueio;
    this.item = params.item;
    this.status = params.status;
    this.codRegra = params.codRegra;
    this.regra = params.regra;
    this.mensagemBloqueio = params.mensagemBloqueio;
    this.descricaoBloqueio = params.descricaoBloqueio;
    this.observacaoBloqueio = params.observacaoBloqueio;
    this.dataHoraSolicitacao = params.dataHoraSolicitacao;
    this.codUsuarioSolicitacao = params.codUsuarioSolicitacao;
    this.nomeUsuarioSolicitacao = params.nomeUsuarioSolicitacao;
    this.estacaoTrabalhoSolicitacao = params.estacaoTrabalhoSolicitacao;
    this.observacaoLiberacaoBloqueio = params.observacaoLiberacaoBloqueio;
    this.motivoRejeicaoLiberacaoBloqueio = params.motivoRejeicaoLiberacaoBloqueio;
  }

  static create(params: {
    codLiberacaoBloqueio: number;
    item: string;
    status: string;
    codRegra: number;
    regra: string;
    mensagemBloqueio: string;
    descricaoBloqueio: string;
    observacaoBloqueio: string;
    dataHoraSolicitacao: Date;
    codUsuarioSolicitacao: number;
    nomeUsuarioSolicitacao: string;
    estacaoTrabalhoSolicitacao: string;
    observacaoLiberacaoBloqueio: string;
    motivoRejeicaoLiberacaoBloqueio: string;
  }) {
    return new ItemLiberacaoBloqueio(params);
  }

  static fromObject(object: any) {
    return new ItemLiberacaoBloqueio({
      codLiberacaoBloqueio: object.codLiberacaoBloqueio,
      item: object.item,
      status: object.status,
      codRegra: object.codRegra,
      regra: object.regra,
      mensagemBloqueio: object.mensagemBloqueio,
      descricaoBloqueio: object.descricaoBloqueio,
      observacaoBloqueio: object.observacaoBloqueio,
      dataHoraSolicitacao: object.dataHoraSolicitacao,
      codUsuarioSolicitacao: object.codUsuarioSolicitacao,
      nomeUsuarioSolicitacao: object.nomeUsuarioSolicitacao,
      estacaoTrabalhoSolicitacao: object.estacaoTrabalhoSolicitacao,
      observacaoLiberacaoBloqueio: object.observacaoLiberacaoBloqueio,
      motivoRejeicaoLiberacaoBloqueio: object.motivoRejeicaoLiberacaoBloqueio,
    });
  }
}
