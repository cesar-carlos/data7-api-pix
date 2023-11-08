import { Router, Request, Response } from 'express';

import LoginController from '../controllers/login.controller';
import RouterExpedicao from '../controllers/expedicao/router.expedicao';
import RouterCobrancaDigital from '../controllers/cobranca.digital/router.cobranca.digital';
import RouterGeral from '../controllers/geral/router.geral';

export default class ApiRoute {
  static router = new ApiRoute().getRouter();
  private _router = Router();

  constructor() {
    this.index();
    this.geral();
    this.cobrancaDigital();
    this.expedicao();
    this.login();
  }

  private getRouter() {
    return this._router;
  }

  private index() {
    this._router.get('/', (req: Request, res: Response) => {
      res.send('Data7 API');
    });
  }

  private geral() {
    this._router.use(RouterGeral.router);
  }

  private cobrancaDigital() {
    this._router.use('/pix', RouterCobrancaDigital.router);
  }

  private expedicao() {
    this._router.use('/expedicao', RouterExpedicao.router);
  }

  private login() {
    this._router.get('/login', LoginController.get);
    this._router.post('/login', LoginController.post);
    this._router.put('/login', LoginController.put);
    this._router.delete('/login', LoginController.delete);
  }
}
