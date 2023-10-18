import { Request, Response } from 'express';

import ExpedicaoContextService from '../services/expedicao.context.service';

export default class ExpedicaoContextController {
  public static async get(req: Request, res: Response) {
    const data7ContextService = ExpedicaoContextService.instance;
    res.status(200).send(data7ContextService.get());
  }

  public static post(req: Request, res: Response) {
    const data7ContextService = ExpedicaoContextService.instance;
    data7ContextService.add(req.body);
    res.status(201).send();
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
