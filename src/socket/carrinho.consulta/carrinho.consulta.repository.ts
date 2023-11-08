import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import ExpedicaoCarrinhoConsultaDto from '../../dto/expedicao/expedicao.carrinho.consulta.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';

export default class CarrinhoConsultaRepository {
  public async select(): Promise<ExpedicaoCarrinhoConsultaDto[]> {
    const repository = this.repository();
    return await repository.select();
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCarrinhoConsultaDto[]> {
    const repository = this.repository();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoCarrinhoConsultaDto[];
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConsultaDto>',
    });
  }
}
