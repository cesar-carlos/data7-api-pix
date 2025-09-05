import { Router, Request, Response } from 'express';

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
}
