import { Request, Response } from 'express';
import { requestCobrancaSe7eDto } from '../dto/request.cobranca.se7e.dto';

import ProcessInfo from '../entities/process.info';
import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';
import ChaveProducaoService from '../services/chave.producao.service';
import CobrancaPixService from '../services/cobranca.pix.service';
import CobrancaService from '../services/cobranca.service';

export default class CobrancaController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    throw new Error('not implemented get');
  }

  public static async post(req: Request, res: Response) {
    try {
      const data = req.body.Data;
      const _request: requestCobrancaSe7eDto[] = data?.map((item: any) => {
        return item;
      });

      if (!_request || _request.length === 0) {
        res.header('ERROR-REQUEST', 'data not found');
        res.status(400).send(`data not found`);
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
        res.header('ERROR-REQUEST', 'data invalid');
        res.status(400).send(`data invalid`);
        return;
      }

      //request key in  production
      const lsChaveRepository = new LocalStorageChaveRepository();
      const chave = await new ChaveProducaoService(lsChaveRepository).execute();
      if (!chave) {
        res.header('ERROR-REQUEST', 'chave not found');
        res.status(400).send(`chave not found`);
        return;
      }

      //start process charge
      const cobrancaService = new CobrancaService(chave);
      const processInfoOrCobranca = await cobrancaService.executar(requestCobranca);
      if (processInfoOrCobranca instanceof ProcessInfo) {
        res.header('ERROR-REQUEST', ` ${processInfoOrCobranca.info};`);
        return res.status(400).send(processInfoOrCobranca);
      }

      //start create pix
      const fbCobrancaPixRepository = new FirebaseCobrancaPixRepository();
      const cobrancaPixService = new CobrancaPixService(fbCobrancaPixRepository);
      const processInfoOrCobrancaPix = await cobrancaPixService.execute(processInfoOrCobranca);
      if (processInfoOrCobrancaPix instanceof ProcessInfo) {
        res.header('ERROR-REQUEST', ` ${processInfoOrCobrancaPix.info};`);
        return res.status(400).send(processInfoOrCobrancaPix);
      }

      res.status(201).send();
    } catch (error: any) {
      res.header('ERROR-REQUEST', error.message);
      res.status(500).send(error.message);
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
