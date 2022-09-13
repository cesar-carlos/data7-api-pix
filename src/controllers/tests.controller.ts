import { Request, Response } from 'express';
import LiberacaoBloqueioDto from '../dto/liberacao.bloqueio.dto';
import LocalSqlServerLiberacaoBloqueioRepository from '../repository/local.sql.server.liberacao.bloqueio.repository';

export default class TestsController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static post(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
