export default class ChaveDto {
  constructor(readonly uuid: string, readonly status: string, readonly dataCriacao: Date, readonly chave: string) {}

  //create method from json
  static fromJson(json: any): ChaveDto {
    return new ChaveDto(json.uuid, json.status, new Date(json.dataCriacao), json.chave);
  }

  //create method to json
  toJson(): any {
    return {
      uuid: this.uuid,
      status: this.status,
      dataCriacao: this.dataCriacao,
      chave: this.chave,
    };
  }
}
