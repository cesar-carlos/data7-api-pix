export default class Filial {
  readonly codEmpresa: number;
  readonly codFilial: number;
  readonly nome: string;
  readonly cnpj: string;

  constructor(params: { codEmpresa: number; codFilial: number; nome: string; cnpj: string }) {
    this.codEmpresa = params.codEmpresa;
    this.codFilial = params.codFilial;
    this.nome = params.nome;
    this.cnpj = params.cnpj;
  }

  static create = (params: { codEmpresa: number; codFilial: number; nome: string; cnpj: string }) => {
    return new Filial(params);
  };

  static fromObject = (object: any) => {
    return new Filial({
      codEmpresa: object.CodEmpresa,
      codFilial: object.CodFilial,
      nome: object.Nome,
      cnpj: object.CNPJ.replace(/[^0-9]/g, ''),
    });
  };
}
