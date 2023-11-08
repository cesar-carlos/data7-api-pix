import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoDto from '../../dto/expedicao/expedicao.carrinho.percurso.dto';

export default class CarrinhoPercursoRepository {
  public async select(): Promise<ExpedicaoCarrinhoPercursoDto[]> {
    const repository = this.repository();
    const result = await repository.select();
    return result;
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async update(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.update(ExpedicaoCarrinhoPercursoDto.fromJson(mutation));
    });
  }

  public async insert(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.insert(ExpedicaoCarrinhoPercursoDto.fromJson(mutation));
    });
  }

  public async delete(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.delete(ExpedicaoCarrinhoPercursoDto.fromJson(mutation));
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoDto>',
    });
  }
}
