import { STATUS } from '../type/status';
import PagamentoAdicionais from './pagamento.adicionais';

export type devedor = {
  cnpj_cpf?: string;
  nome?: string;
};

export default class PagamentoPendente {
  constructor(
    readonly txid: string,
    readonly sysId: string,
    readonly chave: string,
    readonly status: STATUS,
    readonly devedor: devedor,
    readonly criacao: Date,
    readonly expiracao: Date,
    readonly valor: number,
    readonly solicitacaoPagador: string,
    readonly adicionais?: PagamentoAdicionais[],
    readonly qrcode?: string,
    readonly imagemQrcode?: string,
  ) {}
}
