import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import ExpedicaoPercursoEstagioDto from '../../dto/expedicao/expedicao.percurso.estagio.dto';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class PercursoEstagioRepository {
  public async select(params: params[] | string = []): Promise<ExpedicaoPercursoEstagioDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(percursoEstagios: ExpedicaoPercursoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of percursoEstagios) {
      await repository.insert(el);
    }
  }

  public async update(percursoEstagios: ExpedicaoPercursoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of percursoEstagios) {
      await repository.update(el);
    }
  }

  public async delete(percursoEstagios: ExpedicaoPercursoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of percursoEstagios) {
      await repository.delete(el);
    }
  }

  //TODO:: CRIAR SEQUNCIA PARA REMOVER UNDEFINED
  public async sequence(): Promise<SequenceDto | undefined> {
    const name = 'Expedicao.PercursoEstagio_Sequencia_1';
    const repository = this.sequenceRepository();
    return await repository.select(name);
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>',
    });
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
