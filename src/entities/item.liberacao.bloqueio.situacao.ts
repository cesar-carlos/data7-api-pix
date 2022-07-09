export default class ItemLiberacaoBloqueioSituacao {
  constructor(
    private codLiberacaoBloqueio: number,
    private item: string,
    private status: string,
    private rotinaLiberacao: string,
    private dataHoraLiberacao: Date,
    private codUsuarioLiberacao: number,
    private estacaoTrabalhoLiberacao: string,
    private observacaoLiberacao: string,
    private motivoRejeicaoLiberacaoBloqueio: string,
    private complemento: string,
  ) {}

  //create method from json
  static fromJson(json: any): ItemLiberacaoBloqueioSituacao {
    return new ItemLiberacaoBloqueioSituacao(
      json.codLiberacaoBloqueio || json.CodLiberacaoBloqueio,
      json.item || json.Item,
      json.status || json.Status,
      json.rotinaLiberacao || json.RotinaLiberacao,
      json.dataHoraLiberacao || json.DataHoraLiberacao,
      json.codUsuarioLiberacao || json.CodUsuarioLiberacao,
      json.estacaoTrabalhoLiberacao || json.EstacaoTrabalhoLiberacao,
      json.observacaoLiberacao || json.ObservacaoLiberacao,
      json.motivoRejeicaoLiberacaoBloqueio || json.MotivoRejeicaoLiberacaoBloqueio,
      json.complemento || json.Complemento,
    );
  }

  //create method to json
  toJson(): any {
    return {
      CodLiberacaoBloqueio: this.codLiberacaoBloqueio,
      Item: this.item,
      Status: this.status,
      RotinaLiberacao: this.rotinaLiberacao,
      DataHoraLiberacao: this.dataHoraLiberacao,
      CodUsuarioLiberacao: this.codUsuarioLiberacao,
      EstacaoTrabalhoLiberacao: this.estacaoTrabalhoLiberacao,
      ObservacaoLiberacao: this.observacaoLiberacao,
      MotivoRejeicaoLiberacaoBloqueio: this.motivoRejeicaoLiberacaoBloqueio,
      Complemento: this.complemento,
    };
  }

  //create method from object
  static fromObject(object: any): ItemLiberacaoBloqueioSituacao {
    return new ItemLiberacaoBloqueioSituacao(
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
