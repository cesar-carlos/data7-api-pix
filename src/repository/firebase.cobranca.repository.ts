import { getFirestore } from 'firebase-admin/firestore';

import ContractBaseRepository from '../contracts/contract.base.repository';
import Cobranca from '../entities/cobranca';

export default class FirebaseCobrancaRepository implements ContractBaseRepository<Cobranca> {
  readonly doc = 'cobranca';

  constructor() {
    this.initialize();
  }

  private initialize(): void {}

  async getAll(cnpj: string): Promise<Cobranca[]> {
    const db = getFirestore();
    const respose = await db.collection(cnpj).doc(this.doc).listCollections();
    const cobrancas: Cobranca[] = [];

    const collections = respose?.map(async (collection) => {
      return collection.get();
    });

    const docs = await Promise.all(collections);

    docs.forEach((snapshot) => {
      snapshot.forEach((doc) => {
        const cobranca = doc.data() as Cobranca;
        cobrancas.push(cobranca);
      });
    });

    return cobrancas;
  }

  async getById(cnpj: string, id: string): Promise<Cobranca | undefined> {
    const db = getFirestore();
    const snapshot = await db.collection(cnpj).doc(this.doc).collection(id).get();
    const cobrancas = snapshot.docs.map((doc) => {
      const cobranca = doc.data() as Cobranca;
      return cobranca;
    });

    return cobrancas?.shift();
  }

  async insert(cobranca: Cobranca): Promise<void> {
    const db = getFirestore();
    const cnpj = cobranca.id.split('.')[2];
    await db.collection(cnpj).doc(this.doc).collection(cobranca.id).add(cobranca.toJson());
  }

  async update(cobranca: Cobranca): Promise<void> {
    const db = getFirestore();
    const cnpj = cobranca.id.split('.')[2];
    const snapshot = await db.collection(cnpj).doc(this.doc).collection(cobranca.id).get();

    const docId = snapshot.docs
      .map((doc) => {
        return doc.id;
      })
      ?.shift();

    if (docId) {
      await db.collection(cnpj).doc(this.doc).collection(cobranca.id).doc(docId).update(cobranca.toJson());
    }
  }
}
