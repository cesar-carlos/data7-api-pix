import { Request, Response } from 'express';

export default class PagamentoController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
