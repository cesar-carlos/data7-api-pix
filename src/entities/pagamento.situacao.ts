type Devedor = {
  nome: string;
  cpf: string;
};

export default class PagamentoSituacao {
  constructor(
    readonly txId: string,
    readonly locId: string,
    readonly sysId: string,
    readonly status: string,
    readonly chave: string,
    readonly devedor: Devedor,
    readonly DataAbertura: Date,
    readonly DataFechamento?: Date,
  ) {}

  //create method to mount PagamentoPIX from json
  public static fromJson(json: any): PagamentoSituacao {
    return new PagamentoSituacao(
      json.txId,
      json.locId,
      json.sysId,
      json.status,
      json.chave,
      json.devedor,
      json.DataAbertura,
      json.DataFechamento || null,
    );
  }

  //create method to mount PagamentoPIX to json
  public toJson(): any {
    return {
      txId: this.txId,
      locId: this.locId,
      sysId: this.sysId,
      status: this.status,
      chave: this.chave,
      devedor: this.devedor,
      DataAbertura: this.DataAbertura,
      DataFechamento: this.DataFechamento || null,
    };
  }

  //create method from object
}
