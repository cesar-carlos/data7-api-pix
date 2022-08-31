import { classToPlain } from 'class-transformer';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CobrancaLiberacaoKey from '../entities/cobranca.liberacao.key';
import CobrancaPix from '../entities/cobranca.pix';
import PagamentoPix from '../entities/pagamento.pix';
import FirebaseBaseRepository from './firebase.base.repository';

export default class FirebaseCobrancaPixRepository
  extends FirebaseBaseRepository
  implements ContractBaseRepository<CobrancaPix>
{
  readonly collection = 'cobrancas-pix';

  async find(sysId: string): Promise<CobrancaPix | undefined> {
    try {
      const query = this.db.collection(this.collection).where('SysId', '==', sysId).get();
      const docRef = await query;
      const data = docRef.docs.map((doc) => {
        return { ...doc.data() };
      });

      if (!data || data.length === 0) return undefined;
      const cobrancaPix = this.CobrancaPixFromFirebase(data[0]);
      return cobrancaPix;
    } catch (error: any) {
      throw new Error(error).message;
    }
  }

  async findAll(): Promise<CobrancaPix[] | undefined> {
    try {
      const query = this.db.collection(this.collection).get();
      const docRef = await query;
      const cobrancasPix = docRef.docs.map((doc) => {
        return this.CobrancaPixFromFirebase(doc.data());
      });

      return cobrancasPix;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async insert(entity: CobrancaPix): Promise<void> {
    try {
      const docRef = this.db.collection(this.collection).doc();
      await docRef.set(classToPlain(entity, { exposeUnsetFields: false }));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(entity: CobrancaPix): Promise<void> {
    try {
      const query = this.db.collection(this.collection).where('SysId', '==', entity.SysId).get();
      const docRef = await query;
      const docsId = docRef.docs.map((doc) => {
        return doc.id;
      });

      if (docsId.length > 0) {
        await this.db
          .collection(this.collection)
          .doc(docsId[0])
          .update(classToPlain(entity, { exposeUnsetFields: false }));
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async delete(SysId: string): Promise<void> {
    try {
      const query = this.db.collection(this.collection).where('SysId', '==', SysId).get();
      const docRef = await query;
      const docsId = docRef.docs.map((doc) => {
        return doc.id;
      });

      if (docsId.length > 0) {
        await this.db.collection(this.collection).doc(docsId[0]).delete();
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
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
