import path from 'path';

import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import Api from './api';
import AppLinstens from './app.linstens';
import AppDependencys from './app.dependencys';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const bucket = 'gs://data7-api-pix';
    const sicret = require(path.resolve(__dirname, '..', 'certificates', 'secret_firebase.json'));
    initializeApp({ credential: cert(sicret), storageBucket: bucket });
    getFirestore().settings({ ignoreUndefinedProperties: true, timestampsInSnapshots: true });
    AppDependencys.load();
  }

  public async execute() {
    new AppLinstens().execute();
    new Api().execute();
  }
}
