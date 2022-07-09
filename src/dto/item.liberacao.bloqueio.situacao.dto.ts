export default class ItemLiberacaoBloqueioSituacaoDto {
  constructor(
    readonly codLiberacaoBloqueio: number,
    readonly item: string,
    readonly status: string,
    readonly rotinaLiberacao: string,
    readonly dataHoraLiberacao: Date,
    readonly codUsuarioLiberacao: number,
    readonly estacaoTrabalhoLiberacao: string,
    readonly observacaoLiberacao: string,
    readonly motivoRejeicaoLiberacaoBloqueio: string,
    readonly complemento: string,
  ) {}

  //create method from object
  static fromObject(object: any): ItemLiberacaoBloqueioSituacaoDto {
    return new ItemLiberacaoBloqueioSituacaoDto(
      object.codLiberacaoBloqueio || object.CodLiberacaoBloqueio,
      object.item || object.Item,
      object.status || object.Status,
      object.rotinaLiberacao || object.RotinaLiberacao,
      object.dataHoraLiberacao || object.DataHoraLiberacao,
      object.codUsuarioLiberacao || object.CodUsuarioLiberacao,
      object.estacaoTrabalhoLiberacao || object.EstacaoTrabalhoLiberacao,
      object.observacaoLiberacao || object.ObservacaoLiberacao,
      object.motivoRejeicaoLiberacaoBloqueio || object.MotivoRejeicaoLiberacaoBloqueio,
      object.complemento || object.Complemento,
    );
  }
}
