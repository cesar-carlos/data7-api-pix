import { cert, initializeApp } from 'firebase-admin/app';
import ConnectionSqlServerMssql from '../infra/connection.sql.server.mssql';
import LocalSqlServerItemLiberacaoBloqueioRepository from '../repository/local.sql.server.item.liberacao.bloqueio.repository';
import LocalSqlServerLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';
import LocalLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';
import CobrancaPixGnSpec from '../test/cobranca.pix.gn.spec';

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
    const _localSqlServerLiberacaoBloqueioRepository = new LocalSqlServerItemLiberacaoBloqueioRepository();
    _localSqlServerLiberacaoBloqueioRepository.selectWhere([{ key: 'CodLiberacaoBloqueio', value: 2638 }]);

    // const api = new Api();
    // api.execute();
  }
}
