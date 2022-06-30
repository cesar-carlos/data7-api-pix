import { cert, initializeApp } from 'firebase-admin/app';

import Api from './api';
import ListenCreatePIX from '../services/linsten.create.pix';
import LinstenPeymentPIX from '../services/linsten.peyment.pix';
import CobrancaPixGnSpec from '../test/cobranca.pix.gn.spec';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const sicret = require('../certificates/secret_firebase.json');
    initializeApp({ credential: cert(sicret), storageBucket: 'gs://data7-api-pix' });
  }

  public excute() {
    // const pathc = '/Users/cesar-carlos/temp';
    // const listenCreatePIX = new ListenCreatePIX();
    // listenCreatePIX.exec(pathc);

    const api = new Api();
    api.execute();

    console.log('server is running ...');
  }
}
