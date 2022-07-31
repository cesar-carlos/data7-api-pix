import { Request, Response } from 'express';
import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';

import ProcessInfo from '../entities/process.info';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';
import ChaveGnCobrancaService from '../services/chave.gn.cobranca.service';
import CobrancaPixService from '../services/cobranca.pix.service';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    try {
      const data = req.body.Data;
      const _request: requestCobrancaSe7eDto[] = data?.map((item: any) => {
        return item;
      });

      if (!_request || _request.length === 0) {
        res.status(400).send("request's body is invalid");
        return;
      }

      const requestCobranca = _request?.shift();
      if (
        !requestCobranca ||
        !requestCobranca.Filial ||
        !requestCobranca.Usuario ||
        !requestCobranca.Cliente ||
        !requestCobranca.LiberacaoKey ||
        !requestCobranca.Parcelas
      ) {
        res.status(400).send("request's body is invalid");
        return;
      }

      //request key in  production
      const _repository = new LocalStorageChaveRepository();
      const _chaveOrProcessInfo = await new ChaveGnCobrancaService(_repository).execute();
      if (_chaveOrProcessInfo instanceof ProcessInfo) {
        res.status(400).send(_chaveOrProcessInfo);
        return;
      }

      //start process charge
      const _cobrancaPixService = new CobrancaPixService(_chaveOrProcessInfo);
      const processInfoOrResultCreatePix = await _cobrancaPixService.executar(requestCobranca);
      if (processInfoOrResultCreatePix instanceof ProcessInfo) {
        return res.status(400).send(processInfoOrResultCreatePix);
      }

      //TODO: persist processInfoOrResultCreatePix
      console.log(processInfoOrResultCreatePix);
      res.status(201).send();
    } catch (error: any) {
      res.status(500).send('internal server error');
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
