import { Request, Response } from 'express';

import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoDto from '../../dto/expedicao/expedicao.carrinho.dto';
import AppDependencys from '../../aplication/app.dependencys';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class ExpedicaoCarrinhoController {
  public static async get(req: Request, res: Response) {
    try {
      const repository = ExpedicaoCarrinhoController.getRepository();
      const params = ExpedicaoCarrinhoController.buildParams(req);

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
      const repository = ExpedicaoCarrinhoController.getRepository();
      const sequencia = ExpedicaoCarrinhoController.getRepositorySequencia();
      const { CodEmpresa, CodigoBarras, Descricao, Situacao, Ativo } = req.body;

      if (
        CodEmpresa === undefined ||
        CodigoBarras === undefined ||
        Descricao === undefined ||
        Situacao === undefined ||
        Ativo === undefined
      ) {
        res.status(400).send({ message: 'CodEmpresa, CodigoBarras, Descricao, Situacao e Ativo são obrigatórios' });
        return;
      }

      const exists = await repository.selectWhere([{ key: 'CodigoBarras', value: CodigoBarras }]);
      if (exists.length > 0) {
        res.status(400).send({ message: 'Codigo barras carrinho já existente' });
        return;
      }

      const sequenciaName = 'Carrinho_Sequencia_1';
      const sequence = await sequencia.select(sequenciaName);
      if (sequence === undefined) {
        res.status(404).send({ message: 'Sequencia requistro não encontrada' });
        return;
      }

      const expedicaoCarrinhoDto = new ExpedicaoCarrinhoDto({
        CodEmpresa: CodEmpresa,
        CodCarrinho: sequence.valor,
        CodigoBarras: CodigoBarras,
        Descricao: Descricao,
        Situacao: Situacao,
        Ativo: Ativo,
      });

      repository.insert(expedicaoCarrinhoDto);
      res.status(200).send(expedicaoCarrinhoDto);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
  }

  public static async put(req: Request, res: Response) {
    const repository = ExpedicaoCarrinhoController.getRepository();
    const { CodEmpresa, CodCarrinho, CodigoBarras, Descricao, Situacao, Ativo } = req.body;
    if (CodEmpresa === undefined || CodCarrinho === undefined) {
      res.status(400).send({ message: 'CodEmpresa e CodCarrinho é obrigatorio' });
      return;
    }

    const carts = await repository.selectWhere([
      { key: 'CodEmpresa', value: CodEmpresa },
      { key: 'CodCarrinho', value: CodCarrinho },
    ]);

    if (carts.length === 0) {
      res.status(404).send({ message: 'Carrinho não encontrado' });
      return;
    }

    const newCart = carts.shift()!.copyWith({
      CodigoBarras: CodigoBarras,
      Descricao: Descricao,
      Situacao: Situacao,
      Ativo: Ativo,
    });

    repository.update(newCart!);
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
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoDto>',
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
