import { Request, Response } from 'express';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    res.send('Cobranca get');
  }

  public static async post(req: Request, res: Response) {
    res.send('Cobranca post');
  }

  static put(req: Request, res: Response) {
    res.send('Cobranca put');
  }
}
