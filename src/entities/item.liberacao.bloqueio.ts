export default class ItemLiberacaoBloqueio {
  constructor(
    private codLiberacaoBloqueio: number,
    private item: string,
    private status: string,
    private codRegra: number,
    private regra: string,
    private mensagemBloqueio: string,
    private descricaoBloqueio: string,
    private observacaoBloqueio: string,
    private dataHoraSolicitacao: Date,
    private codUsuarioSolicitacao: number,
    private nomeUsuarioSolicitacao: string,
    private estacaoTrabalhoSolicitacao: string,
    private observacaoLiberacaoBloqueio: string,
    private motivoRejeicaoLiberacaoBloqueio: string,
  ) {}

  //create method from json
  static fromJson(json: any): ItemLiberacaoBloqueio {
    return new ItemLiberacaoBloqueio(
      json.codLiberacaoBloqueio || json.CodLiberacaoBloqueio,
      json.item || json.Item,
      json.status || json.Status,
      json.codRegra || json.CodRegra,
      json.regra || json.Regra,
      json.mensagemBloqueio || json.MensagemBloqueio,
      json.descricaoBloqueio || json.DescricaoBloqueio,
      json.observacaoBloqueio || json.ObservacaoBloqueio,
      json.dataHoraSolicitacao || json.DataHoraSolicitacao,
      json.codUsuarioSolicitacao || json.CodUsuarioSolicitacao,
      json.nomeUsuarioSolicitacao || json.NomeUsuarioSolicitacao,
      json.estacaoTrabalhoSolicitacao || json.EstacaoTrabalhoSolicitacao,
      json.observacaoLiberacaoBloqueio || json.ObservacaoLiberacaoBloqueio,
      json.motivoRejeicaoLiberacaoBloqueio || json.MotivoRejeicaoLiberacaoBloqueio,
    );
  }

  //create method to json
  toJson(): any {
    return {
      CodLiberacaoBloqueio: this.codLiberacaoBloqueio,
      Item: this.item,
      Status: this.status,
      CodRegra: this.codRegra,
      Regra: this.regra,
      MensagemBloqueio: this.mensagemBloqueio,
      DescricaoBloqueio: this.descricaoBloqueio,
      ObservacaoBloqueio: this.observacaoBloqueio,
      DataHoraSolicitacao: this.dataHoraSolicitacao,
      CodUsuarioSolicitacao: this.codUsuarioSolicitacao,
      NomeUsuarioSolicitacao: this.nomeUsuarioSolicitacao,
      EstacaoTrabalhoSolicitacao: this.estacaoTrabalhoSolicitacao,
      ObservacaoLiberacaoBloqueio: this.observacaoLiberacaoBloqueio,
      MotivoRejeicaoLiberacaoBloqueio: this.motivoRejeicaoLiberacaoBloqueio,
    };
  }

  //create method from object
  static fromObject(object: any): ItemLiberacaoBloqueio {
    return new ItemLiberacaoBloqueio(
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