export default class PagamentoAdicionais {
  constructor(readonly nome: string, readonly valor: string) {}

  //create method from json
  static fromJson(json: any): PagamentoAdicionais {
    return new PagamentoAdicionais(json.Nome, json.Valor);
  }

  //create method to json
  toJson(): any {
    return {
      Nome: this.nome,
      Valor: this.valor,
    };
  }
}
