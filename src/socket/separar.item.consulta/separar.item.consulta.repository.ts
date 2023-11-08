import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoSepararItemConsultaDto from '../../dto/expedicao/expedicao.separar.item.consulta.dto';

export default class SepararItemConsultaRepository {
  public async select(): Promise<ExpedicaoSepararItemConsultaDto[]> {
    const repository = this.repository();
    return await repository.select();
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoSepararItemConsultaDto[]> {
    const repository = this.repository();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoSepararItemConsultaDto[];
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoSepararItemConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoSepararItemConsultaDto>',
    });
  }
}
