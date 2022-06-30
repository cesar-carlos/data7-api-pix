import { Request, Response } from 'express';

export default class PagamentoController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    res.send('Pagamento get');
  }

  public static async post(req: Request, res: Response) {
    res.send('Pagamento post');
  }

  static put(req: Request, res: Response) {
    res.send('Pagamento put');
  }
}
