import PagamentoAdicionais from './pagamento.adicionais';
import PagamentoLoc from './pagamento.loc';

export type devedor = {
  cpf: string;
  nome: string;
};

export default class PagamentoPendente {
  //create constructor initialize properties
  constructor(
    readonly id: string,
    readonly txid: string,
    readonly chave: string,
    readonly status: string,
    readonly devedor: devedor,
    readonly criacao: Date,
    readonly expiracao: Date,
    readonly valor: number,
    readonly solicitacaoPagador: string,
    readonly loc: PagamentoLoc,
    readonly adicionais?: PagamentoAdicionais[],
  ) {}
}
