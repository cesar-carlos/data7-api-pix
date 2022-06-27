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
  ) {}

  //create method to mount PagamentoPIX from json
  static fromJson(json: any): PagamentoSituacao {
    return new PagamentoSituacao(json.TxId, json.LocId, json.SysId, json.Status, json.Chave, json.Devedor);
  }

  //create method to mount PagamentoPIX to json
  toJson(): any {
    return {
      TxId: this.txId,
      LocId: this.locId,
      SysId: this.sysId,
      Status: this.status,
      Chave: this.chave,
      Devedor: this.devedor,
    };
  }

  //create method to mount PagamentoPIX from object
  static fromObject(obj: any): PagamentoSituacao {
    return new PagamentoSituacao(obj.txId, obj.locId, obj.sysId, obj.status, obj.chave, obj.devedor);
  }
}
