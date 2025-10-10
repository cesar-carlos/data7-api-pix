import { Request, Response } from 'express';

import ExpedicaoBasicListenEvent from '../../model/expedicao.basic.listen.event';
import ExpedicaoSepararConsultaDto from '../../dto/expedicao/expedicao.separar.consulta.dto';
import AppApi from '../../aplication/app.api';

export default class SeparacaoNotifyExpedicaoController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    try {
      const app = AppApi.getInstance();

      // req.body.Data é um array, mapear cada item
      const separars = Array.isArray(req.body.Data)
        ? req.body.Data.map((item: any) => ExpedicaoSepararConsultaDto.fromObject(item))
        : [ExpedicaoSepararConsultaDto.fromObject(req.body)];

      const basicEventSepararConsulta = new ExpedicaoBasicListenEvent({
        Data: separars.map((item: ExpedicaoSepararConsultaDto) => item.toJson()),
      });

      app.getIO().emit('separar.update.listen', JSON.stringify(basicEventSepararConsulta.toJson()));
      res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao processar notificação:', error);
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
