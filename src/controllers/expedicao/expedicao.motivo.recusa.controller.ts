import { Request, Response } from 'express';

import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoMotivoRecusaDto from '../../dto/expedicao/expedicao.motivo.recusa.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class ExpedicaoMotivoRecusaController {
  public static async get(req: Request, res: Response) {
    try {
      const repository = ExpedicaoMotivoRecusaController.getRepository();
      const params = ExpedicaoMotivoRecusaController.buildParams(req);

      if (params.length === 0) {
        const itens = await repository.select();
        res.status(200).send(itens);
        return;
      }

      const itens = await repository.selectWhere(params);
      res.status(200).send(itens);
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
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoMotivoRecusaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoMotivoRecusaDto>',
    });
  }

  public static buildParams(req: Request): params[] {
    const _params: params[] = [];
    for (const keyName in req.query) {
      const value = req.query[keyName];
      _params.push({ key: keyName, value: value });
    }

    return _params;
  }
}
