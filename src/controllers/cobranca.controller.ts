import { Request, Response } from 'express';
import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import CobrancaGnPixService from '../services/cobranca.pix.service';

export default class CobrancaController {
  constructor() {}

  //todo: implementar get
  public static async get(req: Request, res: Response) {
    res.send('Cobranca get');
  }

  public static async post(req: Request, res: Response) {
    const data = req.body.Data;

    const _request: requestCobrancaSe7eDto[] = data?.map((item: any) => {
      return item;
    });

    if (!_request || _request.length === 0) {
      res.status(400).send('Nenhum registro encontrado');
    }

    const requestCobrancaSe7eDto = _request.shift();
    if (requestCobrancaSe7eDto) new CobrancaGnPixService(requestCobrancaSe7eDto).executar();
    res.send('Cobranca post');
  }

  //todo: implementar put
  public static put(req: Request, res: Response) {
    res.send('Cobranca put');
  }

  //todo: implementar delete
  public static delete(req: Request, res: Response) {
    res.send('Cobranca delete');
  }
}
