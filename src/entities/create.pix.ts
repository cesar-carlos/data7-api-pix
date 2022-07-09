import Cobranca from './cobranca';
import PagamentoPendente from './pagamento.pendente';
import PagamentoQrCode from './pagamento.qrcode';
import PagamentoSituacao from './pagamento.situacao';
import { eStatus } from './pagamento.situacao';

export default class CreatePix {
  constructor(
    readonly status: eStatus,
    readonly cobranca: Cobranca,
    readonly pagamentoPendente: PagamentoPendente,
    readonly pagamentoQrCode: PagamentoQrCode,
    readonly pagamentoSituacao: PagamentoSituacao,
  ) {}
}
