import ItemLiberacaoBloqueio from './item.liberacao.bloqueio';
import ItemLiberacaoBloqueioSituacao from './item.liberacao.bloqueio.situacao';

export default class LiberacaoBloqueio {
  readonly codEmpresa: number;
  readonly codFilial: number;
  readonly codLiberacaoBloqueio: number;
  readonly origem: string;
  readonly codOrigem: number;
  readonly dataHoraBloqueio: Date;
  readonly codUsuarioBloqueio: number;
  readonly nomeUsuarioBloqueio: string;
  readonly estacaoTrabalhoBloqueio: string;
  readonly itemLiberacaoBloqueio: ItemLiberacaoBloqueio[];
  readonly itemLiberacaoBloqueioSituacao?: ItemLiberacaoBloqueioSituacao[];

  constructor(params: {
    codEmpresa: number;
    codFilial: number;
    codLiberacaoBloqueio: number;
    origem: string;
    codOrigem: number;
    dataHoraBloqueio: Date;
    codUsuarioBloqueio: number;
    nomeUsuarioBloqueio: string;
    estacaoTrabalhoBloqueio: string;
    itemLiberacaoBloqueio: ItemLiberacaoBloqueio[];
    itemLiberacaoBloqueioSituacao?: ItemLiberacaoBloqueioSituacao[];
  }) {
    this.codEmpresa = params.codEmpresa;
    this.codFilial = params.codFilial;
    this.codLiberacaoBloqueio = params.codLiberacaoBloqueio;
    this.origem = params.origem;
    this.codOrigem = params.codOrigem;
    this.dataHoraBloqueio = params.dataHoraBloqueio;
    this.codUsuarioBloqueio = params.codUsuarioBloqueio;
    this.nomeUsuarioBloqueio = params.nomeUsuarioBloqueio;
    this.estacaoTrabalhoBloqueio = params.estacaoTrabalhoBloqueio;
    this.itemLiberacaoBloqueio = params.itemLiberacaoBloqueio;
    this.itemLiberacaoBloqueioSituacao = params.itemLiberacaoBloqueioSituacao;
  }

  static create(params: {
    codEmpresa: number;
    codFilial: number;
    codLiberacaoBloqueio: number;
    origem: string;
    codOrigem: number;
    dataHoraBloqueio: Date;
    codUsuarioBloqueio: number;
    nomeUsuarioBloqueio: string;
    estacaoTrabalhoBloqueio: string;
    itemLiberacaoBloqueio: ItemLiberacaoBloqueio[];
    itemLiberacaoBloqueioSituacao?: ItemLiberacaoBloqueioSituacao[];
  }) {
    return new LiberacaoBloqueio(params);
  }

  static fromObject(object: any) {
    return new LiberacaoBloqueio({
      codEmpresa: object.codEmpresa,
      codFilial: object.codFilial,
      codLiberacaoBloqueio: object.codLiberacaoBloqueio,
      origem: object.origem,
      codOrigem: object.codOrigem,
      dataHoraBloqueio: object.dataHoraBloqueio,
      codUsuarioBloqueio: object.codUsuarioBloqueio,
      nomeUsuarioBloqueio: object.nomeUsuarioBloqueio,
      estacaoTrabalhoBloqueio: object.estacaoTrabalhoBloqueio,
      itemLiberacaoBloqueio: object.itemLiberacaoBloqueio,
      itemLiberacaoBloqueioSituacao: object.itemLiberacaoBloqueioSituacao,
    });
  }
}
