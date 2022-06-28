export default class Filial {
  constructor(readonly codEmpresa: number, readonly codFilial: number, readonly nome: string, readonly cnpj: string) {}

  //create method from json
  static fromJson(json: any): Filial {
    return new Filial(json.CodEmpresa, json.CodFilial, json.Nome, json.CNPJ);
  }

  //create method to json
  toJson(): any {
    return {
      CodEmpresa: this.codEmpresa,
      CodFilial: this.codFilial,
      Nome: this.nome,
      CNPJ: this.cnpj,
    };
  }

  //create method from object
  static fromObject(obj: any): Filial {
    return new Filial(obj.codEmpresa, obj.codFilial, obj.nome, obj.cnpj);
  }
}
