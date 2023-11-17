import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoCarrinhoConsultaDto from '../../dto/expedicao/expedicao.carrinho.consulta.dto';
import ExpedicaoCarrinhoDto from '../../dto/expedicao/expedicao.carrinho.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class CarrinhoRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoCarrinhoConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoCarrinhoConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoCarrinhoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(carrinhos: ExpedicaoCarrinhoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhos) {
      await repository.insert(el);
    }
  }

  public async update(carrinhos: ExpedicaoCarrinhoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhos) {
      await repository.update(el);
    }
  }

  public async delete(carrinhos: ExpedicaoCarrinhoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhos) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoDto>',
    });
  }
}
