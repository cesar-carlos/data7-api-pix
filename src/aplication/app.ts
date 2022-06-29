import { cert, initializeApp } from 'firebase-admin/app';

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
    const pathc = '/Users/cesar-carlos/temp';
    const listenCreatePIX = new ListenCreatePIX();
    listenCreatePIX.exec(pathc);

    // const _linstenPeymentPIX = new LinstenPeymentPIX();
    // _linstenPeymentPIX.open('e8df2b259b32493db5c4aeb4a22413d1', 6, 6);

    // const _cobrancaPixGnSpec = new CobrancaPixGnSpec();
    // _cobrancaPixGnSpec.exec();

    console.log('server is running ...');
  }
}
