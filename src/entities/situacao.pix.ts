import { STATUS } from '../type/status';
import Cobranca from './cobranca';
import PagamentoPendente from './pagamento.pendente';
import PagamentoQrCode from './pagamento.qrcode';
import PagamentoSituacao from './pagamento.situacao';

export default class SituacaoPix {
  constructor(
    readonly STATUS: STATUS,
    readonly cobranca: Cobranca,
    readonly pagamentoPendente: PagamentoPendente,
    readonly pagamentoQrCode: PagamentoQrCode,
    readonly pagamentoSituacao: PagamentoSituacao,
  ) {}
}
