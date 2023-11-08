import { Request, Response } from 'express';

import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoDto from '../../dto/expedicao/expedicao.carrinho.percurso.dto';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class ExpedicaoCarrinhoPercursoController {
  public static async get(req: Request, res: Response) {
    try {
      const repository = ExpedicaoCarrinhoPercursoController.getRepository();
      const params = ExpedicaoCarrinhoPercursoController.buildParams(req);

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
    try {
      const { CodEmpresa, Origem, CodOrigem, CodCarrinho, Situacao } = req.body;
      const repository = ExpedicaoCarrinhoPercursoController.getRepository();
      const sequencia = ExpedicaoCarrinhoPercursoController.getRepositorySequencia();

      if (
        CodEmpresa === undefined ||
        Origem === undefined ||
        CodOrigem === undefined ||
        CodCarrinho === undefined ||
        Situacao === undefined
      ) {
        res.status(400).send({ message: 'CodEmpresa, Origem, CodOrigem, CodCarrinho e Situacao são obrigatórios' });
        return;
      }

      const sequenciaName = 'CarrinhoPercurso_Sequencia_1';
      const sequence = await sequencia.select(sequenciaName);
      if (sequence === undefined) {
        res.status(404).send({ message: 'Sequencia requistro não encontrada' });
        return;
      }

      const expedicaoCarrinhoPercursoDto = new ExpedicaoCarrinhoPercursoDto({
        CodEmpresa: CodEmpresa,
        CodCarrinhoPercurso: sequence.valor,
        Origem: Origem,
        CodOrigem: CodOrigem,
        CodCarrinho: CodCarrinho,
        Situacao: Situacao,
      });

      repository.insert(expedicaoCarrinhoPercursoDto);
      res.status(200).send(expedicaoCarrinhoPercursoDto);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public static async put(req: Request, res: Response) {
    const { CodEmpresa, CodCarrinhoPercurso, Origem, CodOrigem, CodCarrinho, Situacao } = req.body;
    const repository = ExpedicaoCarrinhoPercursoController.getRepository();

    if (CodEmpresa === undefined || CodCarrinhoPercurso === undefined) {
      res.status(400).send({ message: 'CodEmpresa e CodCarrinhoPercurso são obrigatórios' });
      return;
    }

    const carrinhoPercurso = await repository.selectWhere([
      { key: 'CodEmpresa', value: CodEmpresa },
      { key: 'CodCarrinhoPercurso', value: CodCarrinhoPercurso },
    ]);

    if (carrinhoPercurso.length === 0) {
      res.status(404).send({ message: 'Carrinho Percurso não encontrado' });
      return;
    }

    const newCarrinhoPercurso = carrinhoPercurso.shift()!.copyWith({
      Origem: Origem,
      CodOrigem: CodOrigem,
      CodCarrinho: CodCarrinho,
      Situacao: Situacao,
    });

    repository.update(newCarrinhoPercurso);
    res.status(201).send();
  }

  public static delete(req: Request, res: Response) {
    res.status(404).send({ message: 'not implemented get' });
  }

  public static getRepositorySequencia() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }

  public static getRepository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>',
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
