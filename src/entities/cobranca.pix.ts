import { STATUS } from '../type/status';
import PagamentoPix from '../entities/pagamento.pix';

export default class CobrancaPix {
  constructor(
    readonly SysId: string,
    readonly TxId: string,
    readonly LocId: number,
    readonly STATUS: STATUS,
    readonly DataCriacao: Date,
    readonly Parcela: string,
    readonly Valor: number,
    readonly EmpresaCNPJ: string,
    readonly LinkQrCode: string,
    readonly ImagemQrcode: string,
    readonly NomeUsuario: string,
    readonly EstacaoTrabalho: string,
    readonly IP: string,
    readonly NomeCliente: string,
    readonly Telefone: string,
    readonly EMail: string,
    readonly PagamentoPix?: PagamentoPix[],
  ) {}
}
