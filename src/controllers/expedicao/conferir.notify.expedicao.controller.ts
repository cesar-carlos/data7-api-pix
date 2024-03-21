import { Request, Response } from 'express';

import AppApi from '../../aplication/app.api';
import ExpedicaoBasicEventDto from '../../dto/expedicao/expedicao.basic.event.dto';
import ExpedicaoConferirConsultaDto from '../../dto/expedicao/expedicao.conferir.consulta.dto';

export default class ConferirNotifyExpedicaoController {
  public static async get(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static async post(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static put(req: Request, res: Response) {
    try {
      const app = AppApi.getInstance();
      const conferir = ExpedicaoConferirConsultaDto.fromObject(req.body);
      const conferirs = [conferir];

      const basicEventConferirConsulta = new ExpedicaoBasicEventDto({
        Session: '',
        ResposeIn: '',
        Mutation: conferirs.map((item) => item.toJson()),
      });

      app.io.emit('conferir.update.listen', JSON.stringify(basicEventConferirConsulta.toJson()));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).send({ message: error.message });
    }
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }
}
