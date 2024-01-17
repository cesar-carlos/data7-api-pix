import { Request, Response } from 'express';

export default class GeralHealth {
  public static async get(req: Request, res: Response) {
    res.status(200).send({ status: 'UP' });
  }
}
