export default class Chave {
  constructor(readonly status: string, readonly dataCriacao: Date, readonly chave: string) {}

  //create method from json
  static fromJson(json: any): Chave {
    return new Chave(json.status || json.Status, json.dataCriacao || json.DataCriacao, json.chave || json.chave);
  }
}
