import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import ExpedicaoPercursoEstagioDto from '../../dto/expedicao/expedicao.percurso.estagio.dto';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import AppDependencys from '../../aplication/app.dependencys';

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

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>',
    });
  }
}
