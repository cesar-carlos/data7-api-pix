import { Router, Request, Response } from 'express';

export default class ApiRoute {
  private _router = Router();

  constructor() {
    this.inicialize();
  }

  inicialize() {
    this.index();
  }

  static router = new ApiRoute().getRouter();

  private getRouter() {
    return this._router;
  }

  //add new route here
  private index() {
    this._router.use('/', (req: Request, res: Response) => {
      res.send('Hello World!!');
    });
  }
}
