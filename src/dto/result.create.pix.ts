import Cobranca from '../entities/cobranca';
import PagamentoPendente from '../entities/pagamento.pendente';
import PagamentoQrCode from '../entities/pagamento.qrcode';

export type ResultCreatePix = {
  cobranca: Cobranca;
  pagamentoPendente: PagamentoPendente;
  pagamentoQrCode: PagamentoQrCode;
};
