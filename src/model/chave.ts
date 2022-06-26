export default class Chave {
  constructor(
    readonly status: string,
    readonly dataCriacao: Date,
    readonly chave: string,
  ) {}

  //create method from json
  static fromJson(json: any): Chave {
    return new Chave(json.status, json.dataCriacao, json.chave);
  }

  //create method to json
  toJson(): any {
    return {
      status: this.status,
      dataCriacao: this.dataCriacao,
      chave: this.chave,
    };
  }
}
