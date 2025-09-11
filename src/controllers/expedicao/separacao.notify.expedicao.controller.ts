import { Request, Response } from 'express';

import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import ExpedicaoMutationBasicEvent from '../../model/expedicao.basic.mutation.event';
import AppApi from '../../aplication/app.api';

export default class SeparacaoNotifyExpedicaoController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    try {
      const app = AppApi.getInstance();
      const separar = ExpedicaoSepararDto.fromObject(req.body);
      const separars = [separar];

      const basicEventseparar = new ExpedicaoMutationBasicEvent({
        Session: '',
        ResponseIn: '',
        Mutation: separars.map((item) => item.toJson()),
      });

      app.io.emit('separar.update.listen', JSON.stringify(basicEventseparar.toJson()));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
