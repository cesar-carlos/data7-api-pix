export default class CobrancaLiberacaoKey {
  readonly codEmpresa: number;
  readonly codFilial: number;
  readonly cnpj: string;
  readonly idLiberacao: string;
  readonly origem: string;
  readonly codOrigem: number;
  readonly item: string;
  readonly nomeUsuario: string;
  readonly estacaoTrabalho: string;
  readonly ip: string;

  constructor(params: {
    codEmpresa: number;
    codFilial: number;
    cnpj: string;
    idLiberacao: string;
    origem: string;
    codOrigem: number;
    item: string;
    nomeUsuario: string;
    estacaoTrabalho: string;
    ip: string;
  }) {
    this.codEmpresa = params.codEmpresa;
    this.codFilial = params.codFilial;
    this.cnpj = params.cnpj;
    this.idLiberacao = params.idLiberacao;
    this.origem = params.origem;
    this.codOrigem = params.codOrigem;
    this.item = params.item;
    this.nomeUsuario = params.nomeUsuario;
    this.estacaoTrabalho = params.estacaoTrabalho;
    this.ip = params.ip;
  }

  static create(params: {
    codEmpresa: number;
    codFilial: number;
    cnpj: string;
    idLiberacao: string;
    origem: string;
    codOrigem: number;
    item: string;
    nomeUsuario: string;
    estacaoTrabalho: string;
    ip: string;
  }) {
    return new CobrancaLiberacaoKey(params);
  }

  static fromObject(object: any) {
    return new CobrancaLiberacaoKey({
      codEmpresa: object.CodEmpresa || object.codEmpresa,
      codFilial: object.CodFilial || object.codFilial,
      cnpj: object.CNPJ || object.cnpj,
      idLiberacao: object.IdLiberacao || object.idLiberacao,
      origem: object.Origem || object.origem,
      codOrigem: object.CodOrigem || object.codOrigem,
      item: object.Item || object.item,
      nomeUsuario: object.NomeUsuario || object.nomeUsuario,
      estacaoTrabalho: object.EstacaoTrabalho || object.estacaoTrabalho,
      ip: object.IP || object.ip,
    });
  }
}
