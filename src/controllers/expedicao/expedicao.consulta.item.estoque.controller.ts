import { Request, Response } from 'express';

import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemEstoqueDto from '../../dto/common.data/estoque.produto.consulta.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class ExpedicaoConsultaItemEstoqueController {
  public static async get(req: Request, res: Response) {
    try {
      const repository = ExpedicaoConsultaItemEstoqueController.getRepository();
      const params = ExpedicaoConsultaItemEstoqueController.buildParams(req);

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
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemEstoqueDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemEstoqueDto>',
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
