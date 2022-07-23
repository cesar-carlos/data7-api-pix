import path from 'path';
import { cert, initializeApp } from 'firebase-admin/app';

import Api from './api';
import WebhookGnConfigService from '../services/webhook.gn.config.service';

export default class App {
  constructor() {
    this.initialize();
  }

  private async initialize() {
    const bucket = 'gs://data7-api-pix';
    const sicret = require(path.resolve(__dirname, '..', 'certificates', 'secret_firebase.json'));
    initializeApp({ credential: cert(sicret), storageBucket: bucket });
    require('dotenv').config();
  }

  public async execute() {
    // const api = new Api();
    // api.execute();

    const _webhookGnConfigService = new WebhookGnConfigService();
    _webhookGnConfigService.execute();
  }
}
