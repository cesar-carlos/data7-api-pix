import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoSeparacaoItemConsultaDto from '../../dto/expedicao/expedicao.separacao.item.consulta.dto';

export default class SeparacaoItemConsultaRepository {
  public async select(): Promise<ExpedicaoSeparacaoItemConsultaDto[]> {
    const repository = this.repository();
    return await repository.select();
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoSeparacaoItemConsultaDto[]> {
    const repository = this.repository();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoSeparacaoItemConsultaDto[];
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoSeparacaoItemConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoSeparacaoItemConsultaDto>',
    });
  }
}
