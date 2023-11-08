import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoCarrinhoPercursoConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.consulta.dto';

export default class CarrinhoPercursoConsultaRepository {
  public async select(): Promise<ExpedicaoCarrinhoPercursoConsultaDto[]> {
    const repository = this.repository();
    return await repository.select();
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoConsultaDto[]> {
    const repository = this.repository();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoCarrinhoPercursoConsultaDto[];
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>',
    });
  }
}
