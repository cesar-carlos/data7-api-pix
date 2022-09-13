import { Router, Request, Response } from 'express';

import CobrancaController from '../controllers/cobranca.controller';
import TestsController from '../controllers/tests.controller';
import TimeoutController from '../controllers/timeout.controller';
import PagamentoController from '../controllers/pagamento.controller';
import WebhookRegisterController from '../controllers/webhook.register.controller';

export default class ApiRoute {
  private _router = Router();

  constructor() {
    this.inicialize();
  }

  inicialize() {
    this.index();
    this.webhookRegister();
    this.cobranca();
    this.pagamento();
    this.timeout();
    this.tests();
  }

  static router = new ApiRoute().getRouter();
  private getRouter() {
    return this._router;
  }

  //add new route here
  private index() {
    this._router.get('/', (req: Request, res: Response) => {
      res.send('Data7 API-PIX');
    });
  }

  private webhookRegister() {
    this._router.get('/webhook', WebhookRegisterController.get);
    this._router.post('/webhook', WebhookRegisterController.post);
    this._router.put('/webhook', WebhookRegisterController.put);
    this._router.delete('/webhook', WebhookRegisterController.delete);
  }

  private cobranca() {
    this._router.get('/cobranca/:id', CobrancaController.get);
    this._router.post('/cobranca', CobrancaController.post);
    this._router.put('/cobranca', CobrancaController.put);
    this._router.delete('/cobranca/:sysId', CobrancaController.delete);
  }

  private pagamento() {
    this._router.get('/pagamento/:txid', PagamentoController.get);
    this._router.post('/pagamento', PagamentoController.post);
    this._router.put('/pagamento', PagamentoController.put);
    this._router.delete('/pagamento/:sysId', PagamentoController.delete);
  }

  private timeout() {
    this._router.get('/timeout/:time', TimeoutController.get);
    this._router.post('/timeout', TimeoutController.post);
    this._router.put('/timeout', TimeoutController.put);
    this._router.delete('/timeout', TimeoutController.delete);
  }

  private tests() {
    this._router.get('/tests', TestsController.get);
    this._router.post('/tests', TestsController.post);
    this._router.put('/tests', TestsController.put);
    this._router.delete('/tests', TestsController.delete);
  }
}
