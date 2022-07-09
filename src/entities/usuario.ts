export default class Usuario {
  constructor(
    readonly codUsuario: number,
    readonly nomeUsuario: string,
    readonly estacaoTrabalho: string,
    readonly ip: string,
  ) {}

  //create method from json
  static fromJson(json: any): Usuario {
    return new Usuario(
      json.codUsuario || json.CodUsuario,
      json.nomeUsuario || json.NomeUsuario,
      json.estacaoTrabalho || json.EstacaoTrabalho,
      json.ip || json.IP,
    );
  }

  //create method to json
  toJson(): any {
    return {
      CodUsuario: this.codUsuario,
      NomeUsuario: this.nomeUsuario,
      EstacaoTrabalho: this.estacaoTrabalho,
      ip: this.ip,
    };
  }

  //create method from object
  static fromObject(obj: any): Usuario {
    return new Usuario(
      obj.codUsuario || obj.CodUsuario,
      obj.nomeUsuario || obj.NomeUsuario,
      obj.estacaoTrabalho || obj.EstacaoTrabalho,
      obj.ip || obj.IP,
    );
  }
}
