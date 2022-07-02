import { Request, Response } from 'express';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    console.log('CHAMADO GET');

    res.send('Cobranca get');
  }

  public static async post(req: Request, res: Response) {
    console.log('CHAMADO POST');

    console.log({ ...req.body });
    res.send();
  }

  public static put(req: Request, res: Response) {
    console.log('CHAMADO PUT');
    res.send('Cobranca put');
  }
}
