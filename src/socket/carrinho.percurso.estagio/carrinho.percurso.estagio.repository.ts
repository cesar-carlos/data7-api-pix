import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';

export default class CarrinhoPercursoEstagioRepository {
  public async select(): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    const repository = this.repository();
    const result = await repository.select();
    return result;
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async update(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.update(ExpedicaoCarrinhoPercursoEstagioDto.fromObject(mutation));
    });
  }

  public async insert(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.insert(ExpedicaoCarrinhoPercursoEstagioDto.fromObject(mutation));
    });
  }

  public async delete(mutations: any[] | any): Promise<void> {
    const repository = this.repository();
    if (!Array.isArray(mutations)) mutations = [mutations];

    mutations.forEach(async (mutation: any) => {
      await repository.delete(ExpedicaoCarrinhoPercursoEstagioDto.fromObject(mutation));
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>',
    });
  }
}
