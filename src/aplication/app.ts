import { cert, initializeApp } from 'firebase-admin/app';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const sicret = require('../certificates/secret_firebase.json');
    initializeApp({ credential: cert(sicret) });
  }

  public excute() {
    console.log('server is running ...');
  }
}
