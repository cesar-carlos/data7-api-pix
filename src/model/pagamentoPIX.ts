export default class PagamentoPIX {
  //create construtor inilize all properties
  constructor(
    readonly txid: string,
    readonly endToEndId: string,
    readonly valor: string,
    readonly chave: string,
    readonly horario: Date,
  ) {}

  //create method to mount PagamentoPIX from json
  static fromJSON(json: any): PagamentoPIX {
    return new PagamentoPIX(json.txid, json.endToEndId, json.valor, json.chave, new Date(json.horario));
  }

  //create method to mount PagamentoPIX to json
  toJSON(): any {
    return {
      txid: this.txid,
      endToEndId: this.endToEndId,
      valor: this.valor,
      chave: this.chave,
      horario: this.horario.toISOString(),
    };
  }

  //create method to mount PagamentoPIX from object
  static fromObject(obj: any): PagamentoPIX {
    return new PagamentoPIX(obj.txid, obj.endToEndId, obj.valor, obj.chave, obj.horario);
  }
}
