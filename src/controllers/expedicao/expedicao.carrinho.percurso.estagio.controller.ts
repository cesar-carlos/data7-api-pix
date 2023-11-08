import { Request, Response } from 'express';

import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';

export default class ExpedicaoCarrinhoPercursoEstagioController {
  public static async get(req: Request, res: Response) {
    try {
      const repository = ExpedicaoCarrinhoPercursoEstagioController.getRepository();
      const params = ExpedicaoCarrinhoPercursoEstagioController.buildParams(req);

      if (params.length === 0) {
        const itens = await repository.select();
        res.status(200).send(itens);
        return;
      }

      const expedicaoCarrinhoPercursoEstagioDto = await repository.selectWhere(params);
      res.status(200).send(expedicaoCarrinhoPercursoEstagioDto);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public static async post(req: Request, res: Response) {
    try {
      const repository = ExpedicaoCarrinhoPercursoEstagioController.getRepository();
      const body = req.body;

      if (!Array.isArray(body)) {
        res.status(400).send({ message: 'expected array' });
        return;
      }

      const estagios = body.map((item) => {
        const estagio = ExpedicaoCarrinhoPercursoEstagioDto.fromObject(item);
        return estagio;
      });

      estagios.forEach(async (estagio) => {
        await repository.insert(estagio);
      });

      res.status(201).send();
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public static put(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static getRepository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>',
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
