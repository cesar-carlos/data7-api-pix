import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';

export default class SepararRepository {
  public async select(): Promise<ExpedicaoSepararDto[]> {
    const repository = this.repository();
    const result = await repository.select();
    return result;
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoSepararDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async update(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.update(ExpedicaoSepararDto.fromObject(mutation));
    });
  }

  public async insert(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.insert(ExpedicaoSepararDto.fromObject(mutation));
    });
  }

  public async delete(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.delete(ExpedicaoSepararDto.fromObject(mutation));
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoSepararDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoSepararDto>',
    });
  }
}
