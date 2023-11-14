import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import ExpedicaoPercursoEstagioDto from '../../dto/expedicao/expedicao.percurso.estagio.dto';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import AppDependencys from '../../aplication/app.dependencys';

export default class PercursoEstagioRepository {
  public async select(): Promise<ExpedicaoPercursoEstagioDto[]> {
    const repository = this.repository();
    const result = await repository.select();
    return result;
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoPercursoEstagioDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async update(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.update(ExpedicaoPercursoEstagioDto.fromObject(mutation));
    });
  }

  public async insert(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.insert(ExpedicaoPercursoEstagioDto.fromObject(mutation));
    });
  }

  public async delete(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.delete(ExpedicaoPercursoEstagioDto.fromObject(mutation));
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoPercursoEstagioDto>',
    });
  }
}
