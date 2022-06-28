import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, QuerySnapshot } from 'firebase-admin/firestore';

import ContractBaseRepository from '../contracts/contract.base.repository';
import Pagamento from '../model/pagamento';

export default class FirebasePagamentoRepository implements ContractBaseRepository<Pagamento> {
  readonly sicret = require('../certificates/secret_firebase.json');
  readonly doc = 'pagamento';

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    initializeApp({ credential: cert(this.sicret) });
  }

  async getAll(cnpj: string): Promise<Pagamento[]> {
    const db = getFirestore();
    const respose = await db.collection(cnpj).doc(this.doc).listCollections();
    const pagamentos: Pagamento[] = [];

    const collections = respose?.map(async (collection) => {
      return collection.get();
    });

    const docs = await Promise.all(collections);

    docs.forEach((snapshot) => {
      snapshot.forEach((doc) => {
        const pagamento = doc.data() as Pagamento;
        pagamentos.push(pagamento);
      });
    });

    return pagamentos;
  }

  async getById(cnpj: string, id: string): Promise<Pagamento | undefined> {
    const db = getFirestore();
    const snapshot = await db.collection(cnpj).doc(this.doc).collection(id).get();
    const pagamentos = snapshot.docs.map((doc) => {
      const pagamento = doc.data() as Pagamento;
      return pagamento;
    });

    return pagamentos?.shift();
  }

  async insert(pagamento: Pagamento): Promise<void> {
    const db = getFirestore();
    const cnpj = pagamento.id.split('.')[2];
    await db.collection(cnpj).doc(this.doc).collection(pagamento.id).add(pagamento.toJson());
  }

  async update(pagamento: Pagamento): Promise<void> {
    const db = getFirestore();
    const cnpj = pagamento.id.split('.')[2];
    const snapshot = await db.collection(cnpj).doc(this.doc).collection(pagamento.id).get();

    const docId = snapshot.docs
      .map((doc) => {
        return doc.id;
      })
      ?.shift();

    if (docId) {
      await db.collection(cnpj).doc(this.doc).collection(pagamento.id).doc(docId).update(pagamento.toJson());
    }
  }
}
