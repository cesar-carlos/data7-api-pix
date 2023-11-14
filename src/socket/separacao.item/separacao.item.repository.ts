import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoItemSeparacaoDto from '../../dto/expedicao/expedicao.item.separacao.dto';

export default class SeparacaoItemRepository {
  public async select(): Promise<ExpedicaoItemSeparacaoDto[]> {
    const repository = this.repository();
    const result = await repository.select();
    return result;
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoItemSeparacaoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async update(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.update(ExpedicaoItemSeparacaoDto.fromObject(mutation));
    });
  }

  public async insert(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.insert(ExpedicaoItemSeparacaoDto.fromObject(mutation));
    });
  }

  public async delete(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.delete(ExpedicaoItemSeparacaoDto.fromObject(mutation));
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>',
    });
  }
}
