import { Request, Response } from 'express';
import { txid as helpTxid } from '../helper/txid.help';
import SituacaoGnPixService from '../services/situacao.gn.pix.service';

export default class PagamentoController {
  constructor() {}

  public static async get(req: Request, res: Response) {
    try {
      const { txid } = req.params;
      const isValidtxid = helpTxid.valid(txid);

      if (!isValidtxid) {
        res.status(400).send({ message: 'txid inválido' });
        return;
      }

      const situacaoGnPixService = new SituacaoGnPixService();
      const respose = await situacaoGnPixService.execute(txid);
      return res.status(200).send({ ...respose });
    } catch (error: any) {
      res.status(500).send('internal server error');
    }
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
