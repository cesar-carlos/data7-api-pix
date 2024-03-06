import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import ExpedicaoCarrinhoPercursoAgrupamento from '../../dto/expedicao/expedicao.carrinho.percurso.agrupamento';
import ExpedicaoCarrinhoPercursoAgrupamentoConsulta from '../../dto/expedicao/expedicao.carrinho.percurso.agrupamento.consulta';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class CarrinhoPercursoAgrupamentoRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoAgrupamentoConsulta[]> {
    try {
      const repository = this.repositoryConsulta();
      const result = await repository.selectWhere(params);
      return result as ExpedicaoCarrinhoPercursoAgrupamentoConsulta[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoAgrupamento[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(separars: ExpedicaoCarrinhoPercursoAgrupamento[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of separars) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(separars: ExpedicaoCarrinhoPercursoAgrupamento[]): Promise<void> {
    const repository = this.repository();
    for (const el of separars) {
      await repository.update(el);
    }
  }

  public async delete(separars: ExpedicaoCarrinhoPercursoAgrupamento[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of separars) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    try {
      const name = 'Expedicao.CarrinhoPercursoAgrupamento_1';
      const repository = this.sequenceRepository();
      return await repository.select(name);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoAgrupamentoConsulta>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoAgrupamentoConsulta>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoAgrupamento>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoAgrupamento>',
    });
  }
}
