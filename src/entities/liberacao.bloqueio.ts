import ItemLiberacaoBloqueio from './item.liberacao.bloqueio';
import ItemLiberacaoBloqueioSituacao from './item.liberacao.bloqueio.situacao';

export default class LiberacaoBloqueio {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly codLiberacaoBloqueio: number,
    readonly origem: string,
    readonly codOrigem: number,
    readonly dataHoraBloqueio: Date,
    readonly CodUsuarioBloqueio: number,
    readonly nomeUsuarioBloqueio: string,
    readonly estacaoTrabalhoBloqueio: string,
    readonly itemLiberacaoBloqueio: ItemLiberacaoBloqueio[],
    public itemLiberacaoBloqueioSituacao?: ItemLiberacaoBloqueioSituacao[],
  ) {}

  //create method from json
  static fromJson(json: any): LiberacaoBloqueio {
    return new LiberacaoBloqueio(
      json.codEmpresa || json.CodEmpresa,
      json.codFilial || json.CodFilial,
      json.codLiberacaoBloqueio || json.CodLiberacaoBloqueio,
      json.origem || json.Origem,
      json.codOrigem || json.CodOrigem,
      json.dataHoraBloqueio || json.DataHoraBloqueio,
      json.CodUsuarioBloqueio || json.CodUsuarioBloqueio,
      json.nomeUsuarioBloqueio || json.NomeUsuarioBloqueio,
      json.estacaoTrabalhoBloqueio || json.EstacaoTrabalhoBloqueio,
      json.itemLiberacaoBloqueio || json.ItemLiberacaoBloqueio,
      json.itemLiberacaoBloqueioSituacao || json.ItemLiberacaoBloqueioSituacao,
    );
  }

  //create method to json
  toJson(): any {
    return {
      CodEmpresa: this.codEmpresa,
      CodFilial: this.codFilial,
      CodLiberacaoBloqueio: this.codLiberacaoBloqueio,
      Origem: this.origem,
      CodOrigem: this.codOrigem,
      DataHoraBloqueio: this.dataHoraBloqueio,
      CodUsuarioBloqueio: this.CodUsuarioBloqueio,
      NomeUsuarioBloqueio: this.nomeUsuarioBloqueio,
      EstacaoTrabalhoBloqueio: this.estacaoTrabalhoBloqueio,
      ItemLiberacaoBloqueio: this.itemLiberacaoBloqueio,
      ItemLiberacaoBloqueioSituacao: this.itemLiberacaoBloqueioSituacao,
    };
  }

  //create method from object
  static fromObject(object: any): LiberacaoBloqueio {
    return new LiberacaoBloqueio(
      object.codEmpresa || object.CodEmpresa,
      object.codFilial || object.CodFilial,
      object.codLiberacaoBloqueio || object.CodLiberacaoBloqueio,
      object.origem || object.Origem,
      object.codOrigem || object.CodOrigem,
      object.dataHoraBloqueio || object.DataHoraBloqueio,
      object.CodUsuarioBloqueio || object.CodUsuarioBloqueio,
      object.nomeUsuarioBloqueio || object.NomeUsuarioBloqueio,
      object.estacaoTrabalhoBloqueio || object.EstacaoTrabalhoBloqueio,
      object.itemLiberacaoBloqueio || object.ItemLiberacaoBloqueio,
      object.itemLiberacaoBloqueioSituacao || object.ItemLiberacaoBloqueioSituacao,
    );
  }
}
