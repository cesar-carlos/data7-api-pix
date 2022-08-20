import { STATUS } from '../type/status';
import PagamentoPix from './pagamento.pix';

type devedor = {
  cpf: string;
  nome: string;
};

export default class PagamentoSituacao {
  constructor(
    readonly txId: string,
    readonly sysId: string,
    readonly locId: number,
    readonly status: STATUS,
    readonly chave: string,
    readonly devedor: devedor,
    readonly dataAbertura: Date,
    readonly location: string,
    readonly valor: number,
    readonly pix?: PagamentoPix[],
  ) {}
}
