import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoDto from '../../dto/expedicao/expedicao.carrinho.percurso.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.consulta.dto';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class CarrinhoPercursoRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoEstagioConsultaDto[]> {
    try {
      const repository = this.repositoryConsulta();
      const result = await repository.selectWhere(params);
      return result as ExpedicaoCarrinhoPercursoEstagioConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(models: ExpedicaoCarrinhoPercursoDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(models: ExpedicaoCarrinhoPercursoDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(models: ExpedicaoCarrinhoPercursoDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    try {
      const name = 'CarrinhoPercurso_Sequencia_1';
      const repository = this.sequenceRepository();
      return await repository.select(name);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoEstagioConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoEstagioConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>',
    });
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
