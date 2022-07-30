import { Request, Response } from 'express';
import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';
import ProcessInfo from '../entities/process.info';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';
import ChaveGnCobrancaService from '../services/chave.gn.cobranca.service';
import CobrancaPixService from '../services/cobranca.pix.service';
import Chave from '../entities/chave';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    const data = req.body.Data;
    const _request: requestCobrancaSe7eDto[] = data?.map((item: any) => {
      return item;
    });

    if (!_request || _request.length === 0) {
      res.status(400).send("request's body is invalid");
      return;
    }

    const requestCobrancaSe7eDto = _request.shift();
    if (!requestCobrancaSe7eDto) {
      res.status(400).send("request's body is undefined");
      return;
    }

    const _repository = new LocalStorageChaveRepository();
    const _chaveOrProcessInfo = await new ChaveGnCobrancaService(_repository).execute();
    if (_chaveOrProcessInfo instanceof ProcessInfo) {
      res.status(400).send(_chaveOrProcessInfo);
      return;
    }

    if (_chaveOrProcessInfo instanceof Chave) {
      const _cobrancaPixService = new CobrancaPixService(_chaveOrProcessInfo);
      _cobrancaPixService.executar(requestCobrancaSe7eDto);
      res.status(200).send();
      return;
    }

    res.status(500).send('internal server error');
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
