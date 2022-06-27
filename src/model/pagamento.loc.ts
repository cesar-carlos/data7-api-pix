export default class PagamentoLoc {
  constructor(
    readonly id: number,
    readonly location: string,
    readonly tipoCob?: string,
    readonly criacao?: Date,
  ) {}

  //create method from object
  static fromObject(obj: any): PagamentoLoc {
    return new PagamentoLoc(obj.id, obj.location, obj.tipoCob, obj.criacao);
  }

  //create method from json
  static fromJson(json: any): PagamentoLoc {
    return new PagamentoLoc(json.Id, json.Location, json.TipoCob, json.Criacao);
  }

  //create method to json
  toJson(): any {
    return {
      Id: this.id,
      Location: this.location,
      TipoCob: this.tipoCob,
      Criacao: this.criacao,
    };
  }
}
