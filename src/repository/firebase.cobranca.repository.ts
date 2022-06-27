import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, QuerySnapshot } from 'firebase-admin/firestore';
import Cobranca from '../model/cobranca';

import ContractCobrancaRepository from '../contracts/contract.cobranca.repository';

export default class FirebaseCobrancaRepository implements ContractCobrancaRepository<Cobranca> {
  readonly sicret = require('../certificates/secret_firebase.json');
  readonly doc = 'cobrancas';

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    initializeApp({ credential: cert(this.sicret) });
  }

  async getAll(cnpj: string): Promise<Cobranca[] | undefined> {
    const db = getFirestore();
    const firebaseCollections = await db.collection(cnpj).doc(this.doc).listCollections();

    const collections: string[] = [];
    firebaseCollections.forEach((collection) => {
      collections.push(collection.id);
    });

    const cobrancas: Cobranca[] = [];
    for (const collection of collections) {
      const cobrancasCollection = await db.collection(cnpj).doc(this.doc).collection(collection).get();

      cobrancasCollection.forEach((doc) => {
        const cobranca = doc.data() as Cobranca;
        cobrancas.push(cobranca);
      });
    }

    return cobrancas;
  }

  //todo: implementar
  async getById(cnpj: string, id: string): Promise<Cobranca | undefined> {
    throw new Error('Method not implemented.');
  }

  //create method getByIdThisdate
  async getByIdDate(cnpj: string, date: string, id: string): Promise<Cobranca | undefined> {
    const db = getFirestore();
    const firebaseCollections = await db.collection(cnpj).doc(this.doc).collection(date).doc(id).get();

    const cobranca = firebaseCollections.data() as Cobranca;
    return cobranca;
  }

  async create(entity: Cobranca): Promise<void> {
    if (!entity) return;

    const db = getFirestore();
    const data = entity.toJson();
    const cnpj = entity.filial.cnpj;
    const id = entity.id;
    const date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

    const result = await db.collection(cnpj).doc(this.doc).collection(date).doc(id).set(data);
  }

  //todo: implementar
  update(entity: Cobranca): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
