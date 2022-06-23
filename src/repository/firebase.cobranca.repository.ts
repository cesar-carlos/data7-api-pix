import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

export default class FirebaseCobrancaRepository {
  readonly sicret = require('../../key/secret.json');
  readonly collection = 'cobrancas';
  db: any;

  constructor() {
    this.initialize();
  }

  initialize(): void {
    initializeApp({ credential: cert(this.sicret) });
    this.db = getFirestore();
  }

  async postTest(): Promise<void> {
    const ref = this.db.collection(this.collection).doc();
    const cobranca = require('../assets/open.cobranca.json');
    await ref.set(cobranca);
  }

  async getTest(): Promise<any> {
    const snapshot: any[] = await this.db.collection(this.collection).get();
    snapshot.forEach((doc) => {
      console.log(doc.data());
    });
  }
}
