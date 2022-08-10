import { STATUS } from '../type/status';
import PagamentoPix from '../entities/pagamento.pix';
import CobrancaLiberacaoKey from '../entities/cobranca.liberacao.key';

export default class CobrancaPix {
  constructor(
    readonly SysId: string,
    readonly TxId: string,
    readonly LocId: number,
    public STATUS: STATUS,
    readonly datacriacao: Date,
    readonly Parcela: string,
    readonly Valor: number,
    readonly LinkQrCode: string,
    readonly ImagemQrcode: string,
    readonly NomeCliente: string,
    readonly Telefone: string,
    readonly EMail: string,
    readonly LiberacaoKey: CobrancaLiberacaoKey,
    readonly PagamentoPix?: PagamentoPix[],
  ) {}
}
