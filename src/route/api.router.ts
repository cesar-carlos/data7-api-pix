import { Router, Request, Response } from 'express';

import CobrancaController from '../controllers/cobranca.controller';
import TimeoutController from '../controllers/timeout.controller';
import PagamentoController from '../controllers/pagamento.controller';
import WebhookRegisterController from '../controllers/webhook.register.controller';
import LoginController from '../controllers/login.controller';
import ExpedicaoContextController from '../controllers/expedicao.context.controller';

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

    this.login();
    this.Data7Login();
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
    this._router.get('/cobranca', CobrancaController.get);
    this._router.get('/cobranca/:id', CobrancaController.get);
    this._router.post('/cobranca', CobrancaController.post);
    this._router.put('/cobranca', CobrancaController.put);
    this._router.delete('/cobranca/:sysId', CobrancaController.delete);
  }

  private pagamento() {
    this._router.get('/pagamento', PagamentoController.getOrigem);
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

  private login() {
    this._router.get('/login', LoginController.get);
    this._router.get('/login', LoginController.get);
    this._router.post('/login', LoginController.post);
    this._router.put('/login', LoginController.put);
    this._router.delete('/login', LoginController.delete);
  }

  private Data7Login() {
    this._router.get('/expedicao/context', ExpedicaoContextController.get);
    this._router.post('/expedicao/context', ExpedicaoContextController.post);
    this._router.put('/expedicao/context', ExpedicaoContextController.put);
    this._router.delete('/expedicao/context', ExpedicaoContextController.delete);
  }
}
