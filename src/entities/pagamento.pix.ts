export default class PagamentoPix {
  readonly txid: string;
  readonly endToEndId: string;
  readonly chave: string;
  readonly horario: Date;
  readonly valor: number;
  readonly infoPagador?: string;

  constructor(params: {
    txid: string;
    endToEndId: string;
    chave: string;
    horario: Date;
    valor: number;
    infoPagador?: string;
  }) {
    this.txid = params.txid;
    this.endToEndId = params.endToEndId;
    this.chave = params.chave;
    this.horario = params.horario;
    this.valor = params.valor;
    this.infoPagador = params.infoPagador;
  }

  static create(params: {
    txid: string;
    endToEndId: string;
    chave: string;
    horario: Date;
    valor: number;
    infoPagador?: string;
  }) {
    return new PagamentoPix(params);
  }
}
