import { cert, initializeApp } from 'firebase-admin/app';

import ListenCreatePIX from '../services/linsten.create.pix';
import LinstenPeymentPIX from '../services/linsten.peyment.pix';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const sicret = require('../certificates/secret_firebase.json');
    initializeApp({ credential: cert(sicret), storageBucket: 'gs://data7-api-pix' });
  }

  public excute() {
    const pathc = '/Users/cesar-carlos/temp';
    const listenCreatePIX = new ListenCreatePIX();
    listenCreatePIX.exec(pathc);

    // const _linstenPeymentPIX = new LinstenPeymentPIX();
    // _linstenPeymentPIX.open();

    console.log('server is running ...');
  }
}
