export default class PagamentoPix {
  //create construtor inilize all properties
  constructor(
    readonly Txid: string,
    readonly EndToEndId: string,
    readonly Chave: string,
    readonly Horario: Date,
    readonly Valor: number,
    readonly InfoPagador?: string,
  ) {}
}
