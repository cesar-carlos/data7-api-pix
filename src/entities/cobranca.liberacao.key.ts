export default class CobrancaLiberacaoKey {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly CNPJ: string,
    readonly nomeUsuario: string,
    readonly estacaoTrabalho: string,
    readonly IP: string,
    readonly idLiberacao: string,
    readonly origem: string,
    readonly codOrigem: number,
    readonly item: string,
  ) {}

  //create method from json
  public static fromJson(json: any): CobrancaLiberacaoKey {
    return new CobrancaLiberacaoKey(
      json.codEmpresa,
      json.codFilial,
      json.CNPJ,
      json.nomeUsuario,
      json.estacaoTrabalho,
      json.IP,
      json.idLiberacao,
      json.origem,
      json.codOrigem,
      json.item,
    );
  }

  //create method to json
  public toJson(): any {
    return {
      codEmpresa: this.codEmpresa,
      codFilial: this.codFilial,
      CNPJ: this.CNPJ,
      nomeUsuario: this.nomeUsuario,
      estacaoTrabalho: this.estacaoTrabalho,
      IP: this.IP,
      idLiberacao: this.idLiberacao,
      origem: this.origem,
      codOrigem: this.codOrigem,
      item: this.item,
    };
  }

  //create method to json
  public toObject(): any {
    return {
      codEmpresa: this.codEmpresa,
      codFilial: this.codFilial,
      CNPJ: this.CNPJ,
      nomeUsuario: this.nomeUsuario,
      estacaoTrabalho: this.estacaoTrabalho,
      IP: this.IP,
      idLiberacao: this.idLiberacao,
      origem: this.origem,
      codOrigem: this.codOrigem,
      item: this.item,
    };
  }

  //create method from object
  public static fromObject(object: any): CobrancaLiberacaoKey {
    return new CobrancaLiberacaoKey(
      object.codEmpresa || object.CodEmpresa,
      object.codFilial || object.CodFilial,
      object.CNPJ || object.CNPJ,
      object.nomeUsuario || object.NomeUsuario,
      object.estacaoTrabalho || object.EstacaoTrabalho,
      object.ip || object.IP,
      object.idLiberacao || object.IdLiberacao,
      object.origem || object.Origem,
      object.codOrigem || object.CodOrigem,
      object.item || object.Item,
    );
  }
}
