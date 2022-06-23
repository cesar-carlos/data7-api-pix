export default class Usuario {
  constructor(
    readonly codUsuario: number,
    readonly nomeUsuario: string,
    readonly estacaoTrabalho: string
  ) {}

  //create method from json
  static fromJson(json: any): Usuario {
    return new Usuario(json.CodUsuario, json.NomeUsuario, json.EstacaoTrabalho);
  }
}
