import path from 'path';
import { cert, initializeApp } from 'firebase-admin/app';

import Api from './api';
import CobrancaPixListenService from '../services/cobranca.pix.listen.service';
import { getFirestore } from 'firebase-admin/firestore';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const bucket = 'gs://data7-api-pix';
    const sicret = require(path.resolve(__dirname, '..', 'certificates', 'secret_firebase.json'));
    initializeApp({ credential: cert(sicret), storageBucket: bucket });
    getFirestore().settings({ ignoreUndefinedProperties: true, timestampsInSnapshots: true });
    require('dotenv').config();
  }

  public async execute() {
    new CobrancaPixListenService().linten();
    new Api().execute();
  }
}
