export default class Filial {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly nome: string,
    readonly cnpj: string
  ) {}

  //create method from json
  static fromJson(json: any): Filial {
    return new Filial(json.CodEmpresa, json.CodFilial, json.Nome, json.CNPJ);
  }
}
