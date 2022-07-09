export default class LiberacaoBloqueioDto {
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
  ) {}

  //create method from object
  static fromObject(object: any): LiberacaoBloqueioDto {
    return new LiberacaoBloqueioDto(
      object.codEmpresa || object.CodEmpresa,
      object.codFilial || object.CodFilial,
      object.codLiberacaoBloqueio || object.CodLiberacaoBloqueio,
      object.origem || object.Origem,
      object.codOrigem || object.CodOrigem,
      object.dataHoraBloqueio || object.DataHoraBloqueio,
      object.CodUsuarioBloqueio || object.CodUsuarioBloqueio,
      object.nomeUsuarioBloqueio || object.NomeUsuarioBloqueio,
      object.estacaoTrabalhoBloqueio || object.EstacaoTrabalhoBloqueio,
    );
  }
}
