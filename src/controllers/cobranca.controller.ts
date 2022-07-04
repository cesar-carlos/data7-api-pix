import { Request, Response } from 'express';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    console.log('CHAMADO POST');

    console.log(req.params);
    console.log(req.query);
    res.send('Cobranca post');
  }

  public static async post(req: Request, res: Response) {
    console.log('CHAMADO POST');

    console.log(req.body);
    res.send('Cobranca post');
  }

  public static put(req: Request, res: Response) {
    res.send('Cobranca put');
  }

  public static delete(req: Request, res: Response) {
    res.send('Cobranca delete');
  }
}
