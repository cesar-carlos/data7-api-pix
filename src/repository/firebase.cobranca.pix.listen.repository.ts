import moment from 'moment';
import CobrancaLiberacaoKey from '../entities/cobranca.liberacao.key';
import CobrancaPix from '../entities/cobranca.pix';
import PagamentoPix from '../entities/pagamento.pix';
import { STATUS } from '../type/status';
import FirebaseBaseRepository from './firebase.base.repository';

export default class FirebaseCobrancaPixListenRepository extends FirebaseBaseRepository {
  readonly collection = 'cobrancas-pix';
  linten(callback: (CobrancaPix: any) => void): void {
    try {
      this.db
        .collection(this.collection)
        .where('STATUS', 'in', [STATUS.CONCLUIDO, STATUS.CANCELADO_CLIENTE])
        .where('datacriacao', '>', moment().subtract(1, 'day').toDate())
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const cobranca = this.CobrancaPixFromFirebase(data);
            callback(cobranca);
          });
        });
    } catch (error: any) {}
  }

  private CobrancaPixFromFirebase(data: any): CobrancaPix {
    const datacriacao = data.datacriacao._seconds ? new Date(data.datacriacao._seconds * 1000) : data.datacriacao;

    const liberacao = new CobrancaLiberacaoKey({
      codEmpresa: data.LiberacaoKey.codEmpresa,
      codFilial: data.LiberacaoKey.codFilial,
      cnpj: data.LiberacaoKey.cnpj,
      idLiberacao: data.LiberacaoKey.idLiberacao,
      origem: data.LiberacaoKey.origem,
      codOrigem: data.LiberacaoKey.codOrigem,
      item: data.LiberacaoKey.item,
      nomeUsuario: data.LiberacaoKey.nomeUsuario,
      estacaoTrabalho: data.LiberacaoKey.estacaoTrabalho,
      ip: data.LiberacaoKey.ip,
    });

    const pagamentos = data.PagamentoPix.map((item: any) => {
      return new PagamentoPix({
        txid: item.txid,
        endToEndId: item.endToEndId,
        chave: item.chave,
        horario: item.horario,
        valor: item.valor,
        infoPagador: item.infoPagador,
      });
    });

    const cobrancaPix = new CobrancaPix({
      sysId: data.sysId,
      txId: data.txId,
      locId: data.locId,
      STATUS: data.STATUS,
      datacriacao: datacriacao,
      parcela: data.parcela,
      valor: data.valor,
      linkQrCode: data.linkQrCode,
      imagemQrcode: data.imagemQrcode,
      nomeCliente: data.nomeCliente,
      telefone: data.telefone,
      eMail: data.eMail,
      liberacaoKey: liberacao,
    });

    return cobrancaPix;
  }
}
