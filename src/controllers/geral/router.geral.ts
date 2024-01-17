import { Router, Request, Response } from 'express';

import GeralHealth from './geral.health';
import GeralSequenciaController from './geral.sequencia.controller';
import GeralProcessoExecutavelController from './geral.processo.executavel.controller';

export default class RouterGeral {
  static router = new RouterGeral().getRouter();
  private _router = Router();

  constructor() {
    this.index();
    this.health();
    this.sequenciaRegistro();
    this.processoExecutavel();
  }

  private getRouter() {
    return this._router;
  }

  private index() {
    this._router.get('/', (req: Request, res: Response) => {
      res.send('Data7 geral');
    });
  }

  private health() {
    this._router.get('/health', GeralHealth.get);
  }

  private sequenciaRegistro() {
    this._router.get('/sequencia', GeralSequenciaController.get);
    this._router.get('/sequencia/:nome', GeralSequenciaController.get);
    this._router.post('/sequencia', GeralSequenciaController.post);
    this._router.put('/sequencia', GeralSequenciaController.put);
    this._router.delete('/sequencia', GeralSequenciaController.delete);
  }

  private processoExecutavel() {
    this._router.get('/processoExecutavel', GeralProcessoExecutavelController.get);
    this._router.post('/processoExecutavel', GeralProcessoExecutavelController.post);
    this._router.put('/processoExecutavel/:CodProcessoExecutavel', GeralProcessoExecutavelController.put);
    this._router.delete('/processoExecutavel', GeralProcessoExecutavelController.delete);
  }
}
