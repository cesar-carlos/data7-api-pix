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
    const liberacaoKey = new CobrancaLiberacaoKey(
      data.LiberacaoKey.codEmpresa,
      data.LiberacaoKey.codFilial,
      data.LiberacaoKey.CNPJ,
      data.LiberacaoKey.nomeUsuario,
      data.LiberacaoKey.estacaoTrabalho,
      data.LiberacaoKey.IP,
      data.LiberacaoKey.idLiberacao,
      data.LiberacaoKey.origem,
      data.LiberacaoKey.codOrigem,
      data.LiberacaoKey.item,
    );

    const pagamentosPix: PagamentoPix[] = data[0]?.PagamentoPix?.map((pix: any) => {
      return new PagamentoPix(pix.txid, pix.endToEndId, pix.chave, pix.horario, pix.valor, pix.infoPagador);
    });

    const cobrancaPix = new CobrancaPix(
      data.SysId,
      data.TxId,
      data.LocId,
      data.STATUS,
      datacriacao,
      data.Parcela,
      data.Valor,
      data.LinkQrCode,
      data.ImagemQrcode,
      data.NomeCliente,
      data.Telefone,
      data.EMail,
      liberacaoKey,
      pagamentosPix,
    );

    return cobrancaPix;
  }
}
