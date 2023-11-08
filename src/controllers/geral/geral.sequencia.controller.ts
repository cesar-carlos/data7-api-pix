import { Request, Response } from 'express';

import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class GeralSequenciaController {
  public static async get(req: Request, res: Response) {
    try {
      const sequenciaNome = req.params.nome;
      const repository = GeralSequenciaController.getRepository();
      const sequenceDto = await repository.select(sequenciaNome);

      if (sequenceDto === undefined) {
        res.status(404).send({ message: 'sequence not found' });
        return;
      }

      res.status(200).send(sequenceDto);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
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

  public static getRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
