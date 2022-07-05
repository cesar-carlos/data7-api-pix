import { cert, initializeApp } from 'firebase-admin/app';

import Api from './api';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const sicret = require('../certificates/secret_firebase.json');
    initializeApp({ credential: cert(sicret), storageBucket: 'gs://data7-api-pix' });
    require('dotenv').config();
  }

  public execute() {
    const api = new Api();
    api.execute();
  }
}
