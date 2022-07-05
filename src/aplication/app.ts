import { cert, initializeApp } from 'firebase-admin/app';

import Api from './api';
import ListenCreatePIX from '../services/linsten.create.pix';
import LinstenPeymentPIX from '../services/linsten.peyment.pix';

export default class App {
  private api
  constructor(ServerApi: any) {
    this.api = ServerApi
    this.initialize();
  }

  private async initialize() {
    const sicret = require('../../public/certificates/secret_firebase.json');
    initializeApp({ credential: cert(sicret), storageBucket: 'gs://data7-api-pix' });
    require('dotenv').config();
  }

  public execute(cb: Function) {
    this.api.execute(cb);
  }
  public stop(cb: Function) {
    this.api.stop(cb);
  }
}
