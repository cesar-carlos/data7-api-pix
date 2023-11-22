import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoDto from '../../dto/expedicao/expedicao.carrinho.percurso.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoCarrinhoPercursoConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.consulta.dto';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class CarrinhoPercursoRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoCarrinhoPercursoConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(carrinhoPercursos: ExpedicaoCarrinhoPercursoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhoPercursos) {
      await repository.insert(el);
    }
  }

  public async update(carrinhoPercursos: ExpedicaoCarrinhoPercursoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhoPercursos) {
      await repository.update(el);
    }
  }

  public async delete(carrinhoPercursos: ExpedicaoCarrinhoPercursoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhoPercursos) {
      await repository.delete(el);
    }
  }

  //TODO:: CRIAR SEQUNCIA PARA REMOVER UNDEFINED
  public async sequence(): Promise<SequenceDto | undefined> {
    const name = 'CarrinhoPercurso_Sequencia_1';
    const repository = this.sequenceRepository();
    return await repository.select(name);
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>',
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
