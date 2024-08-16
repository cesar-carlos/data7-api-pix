import { Router, Request, Response } from 'express';

import ConferirExpedicaoController from './conferir.notify.expedicao.controller';
import ConferirNotifyExpedicaoController from './conferir.notify.expedicao.controller';
import SeparacaoNotifyExpedicaoController from './separacao.notify.expedicao.controller';
import SeparacaoExpedicaoController from './separacao.expedicao.controller';

export default class RouterExpedicao {
  static router = new RouterExpedicao().getRouter();
  private _router = Router();

  constructor() {
    this.index();
    this.conferirExpedicaoController();
    this.conferirNotifyExpedicaoController();
    this.sepacaoExpedicaoController();
    this.sepacaoNotifyExpedicaoController();
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

  private sepacaoExpedicaoController() {
    this._router.get('/separacao', SeparacaoExpedicaoController.get);
    this._router.post('/separacao', SeparacaoExpedicaoController.post);
    this._router.put('/separacao', SeparacaoExpedicaoController.put);
    this._router.delete('/separacao', SeparacaoExpedicaoController.delete);
  }

  private sepacaoNotifyExpedicaoController() {
    this._router.get('/separacao/notify', SeparacaoNotifyExpedicaoController.get);
    this._router.post('/separacao/notify', SeparacaoNotifyExpedicaoController.post);
    this._router.put('/separacao/notify', SeparacaoNotifyExpedicaoController.put);
    this._router.delete('/separacao/notify', SeparacaoNotifyExpedicaoController.delete);
  }
}
