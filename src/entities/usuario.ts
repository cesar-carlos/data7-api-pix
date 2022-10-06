export default class Usuario {
  readonly codUsuario: number;
  readonly nomeUsuario: string;
  readonly estacaoTrabalho: string;

  constructor(params: { codUsuario: number; nomeUsuario: string; estacaoTrabalho: string }) {
    this.codUsuario = params.codUsuario;
    this.nomeUsuario = params.nomeUsuario;
    this.estacaoTrabalho = params.estacaoTrabalho;
  }

  static create = (params: { codUsuario: number; nomeUsuario: string; estacaoTrabalho: string }) => {
    return new Usuario(params);
  };

  static fromObject = (object: any) => {
    return new Usuario({
      codUsuario: object.CodUsuario,
      nomeUsuario: object.NomeUsuario,
      estacaoTrabalho: object.EstacaoTrabalho,
    });
  };
}
