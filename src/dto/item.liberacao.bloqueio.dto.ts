export default class ItemLiberacaoBloqueioDto {
  constructor(
    readonly codLiberacaoBloqueio: number,
    readonly item: string,
    readonly status: string,
    readonly codRegra: number,
    readonly regra: string,
    readonly mensagemBloqueio: string,
    readonly descricaoBloqueio: string,
    readonly observacaoBloqueio: string,
    readonly dataHoraSolicitacao: Date,
    readonly codUsuarioSolicitacao: number,
    readonly nomeUsuarioSolicitacao: string,
    readonly estacaoTrabalhoSolicitacao: string,
    readonly observacaoLiberacaoBloqueio: string,
    readonly motivoRejeicaoLiberacaoBloqueio: string,
  ) {}

  //create method from object
  static fromObject(object: any): ItemLiberacaoBloqueioDto {
    return new ItemLiberacaoBloqueioDto(
      object.codLiberacaoBloqueio || object.CodLiberacaoBloqueio,
      object.item || object.Item,
      object.status || object.Status,
      object.codRegra || object.CodRegra,
      object.regra || object.Regra,
      object.mensagemBloqueio || object.MensagemBloqueio,
      object.descricaoBloqueio || object.DescricaoBloqueio,
      object.observacaoBloqueio || object.ObservacaoBloqueio,
      object.dataHoraSolicitacao || object.DataHoraSolicitacao,
      object.codUsuarioSolicitacao || object.CodUsuarioSolicitacao,
      object.nomeUsuarioSolicitacao || object.NomeUsuarioSolicitacao,
      object.estacaoTrabalhoSolicitacao || object.EstacaoTrabalhoSolicitacao,
      object.observacaoLiberacaoBloqueio || object.ObservacaoLiberacaoBloqueio,
      object.motivoRejeicaoLiberacaoBloqueio || object.MotivoRejeicaoLiberacaoBloqueio,
    );
  }
}
