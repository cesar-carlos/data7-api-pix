import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import ExpedicaoEstagioDto from '../../dto/expedicao/expedicao.estagio.dto';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class ExpedicaoEstagioRepository {
  public async select(params: params[] | string = []): Promise<ExpedicaoEstagioDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(percursoEstagios: ExpedicaoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of percursoEstagios) {
      await repository.insert(el);
    }
  }

  public async update(percursoEstagios: ExpedicaoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of percursoEstagios) {
      await repository.update(el);
    }
  }

  public async delete(percursoEstagios: ExpedicaoEstagioDto[]): Promise<void> {
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
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoEstagioDto>',
    });
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
