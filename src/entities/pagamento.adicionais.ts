export default class PagamentoAdicionais {
  readonly nome: string;
  readonly valor: string;

  constructor(params: { nome: string; valor: string }) {
    this.nome = params.nome;
    this.valor = params.valor;
  }

  static create = (params: { nome: string; valor: string }) => new PagamentoAdicionais(params);
}
