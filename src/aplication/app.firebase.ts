import path from 'path';

import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export default class AppFirebase {
  public static async load() {
    const bucket = 'gs://data7-api-pix';
    const sicret = require(path.resolve(__dirname, '..', 'certificates', 'secret_firebase.json'));
    initializeApp({ credential: cert(sicret), storageBucket: bucket });
    getFirestore().settings({ ignoreUndefinedProperties: true, timestampsInSnapshots: true });
  }
}
