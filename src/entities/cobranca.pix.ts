import { STATUS } from '../type/status';
import PagamentoPix from '../entities/pagamento.pix';
import CobrancaLiberacaoKey from './cobranca.liberacao.key';

export default class CobrancaPix {
  readonly sysId: string;
  readonly txId: string;
  readonly locId: number;
  public STATUS: STATUS;
  readonly datacriacao: Date;
  readonly parcela: string;
  readonly valor: number;
  readonly linkQrCode: string;
  readonly imagemQrcode: string;
  readonly nomeCliente: string;
  readonly telefone: string;
  readonly eMail: string;
  readonly liberacaoKey: CobrancaLiberacaoKey;

  constructor(params: {
    sysId: string;
    txId: string;
    locId: number;
    STATUS: STATUS;
    datacriacao: Date;
    parcela: string;
    valor: number;
    linkQrCode: string;
    imagemQrcode: string;
    nomeCliente: string;
    telefone: string;
    eMail: string;
    liberacaoKey: CobrancaLiberacaoKey;
  }) {
    this.sysId = params.sysId;
    this.txId = params.txId;
    this.locId = params.locId;
    this.STATUS = params.STATUS;
    this.datacriacao = params.datacriacao;
    this.parcela = params.parcela;
    this.valor = params.valor;
    this.linkQrCode = params.linkQrCode;
    this.imagemQrcode = params.imagemQrcode;
    this.nomeCliente = params.nomeCliente;
    this.telefone = params.telefone;
    this.eMail = params.eMail;
    this.liberacaoKey = params.liberacaoKey;
  }

  static create(params: {
    sysId: string;
    txId: string;
    locId: number;
    STATUS: STATUS;
    datacriacao: Date;
    parcela: string;
    valor: number;
    linkQrCode: string;
    imagemQrcode: string;
    nomeCliente: string;
    telefone: string;
    eMail: string;
    liberacaoKey: CobrancaLiberacaoKey;
  }) {
    return new CobrancaPix(params);
  }
}
