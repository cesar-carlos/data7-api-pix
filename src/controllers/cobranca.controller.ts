import { Request, Response } from 'express';

export default class CobrancaController {
  constructor() { }

  public static async get(req: Request, res: Response) {
    console.log('CHAMADO GET');
    res.send('Cobranca get');
  }

  public static async post(req: Request, res: Response) {
    console.log('CHAMADO POST');
    res.send('Cobranca post');
  }

  public static put(req: Request, res: Response) {
    res.send('Cobranca put');
  }

  public static delete(req: Request, res: Response) {
    res.send('Cobranca delete');
  }
}
