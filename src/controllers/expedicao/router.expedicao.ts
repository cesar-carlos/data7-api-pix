import { Router, Request, Response } from 'express';

import ConferirExpedicaoController from './conferir.notify.expedicao.controller';
import ConferirNotifyExpedicaoController from './conferir.notify.expedicao.controller';

export default class RouterExpedicao {
  static router = new RouterExpedicao().getRouter();
  private _router = Router();

  constructor() {
    this.index();

    this.conferirExpedicaoController();
    this.conferirNotifyExpedicaoController();
  }

  private getRouter() {
    return this._router;
  }

  private index() {
    this._router.get('/', (req: Request, res: Response) => {
      res.send('Data7 Expedição');
    });
  }

  private conferirExpedicaoController() {
    this._router.get('/conferir', ConferirExpedicaoController.get);
    this._router.post('/conferir', ConferirExpedicaoController.post);
    this._router.put('/conferir', ConferirExpedicaoController.put);
    this._router.delete('/conferir', ConferirExpedicaoController.delete);
  }

  private conferirNotifyExpedicaoController() {
    this._router.get('/conferir/notify', ConferirNotifyExpedicaoController.get);
    this._router.post('/conferir/notify', ConferirNotifyExpedicaoController.post);
    this._router.put('/conferir/notify', ConferirNotifyExpedicaoController.put);
    this._router.delete('/conferir/notify', ConferirNotifyExpedicaoController.delete);
  }
}
