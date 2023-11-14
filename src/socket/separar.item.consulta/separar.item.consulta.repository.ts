import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSepararConsultaDto from '../../dto/expedicao/expedicao.item.separar.consulta.dto';

export default class SepararItemConsultaRepository {
  public async select(): Promise<ExpedicaoItemSepararConsultaDto[]> {
    const repository = this.repository();
    return await repository.select();
  }

  public async selectWhere(params: params[] | string = []): Promise<ExpedicaoItemSepararConsultaDto[]> {
    const repository = this.repository();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemSepararConsultaDto[];
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>',
    });
  }
}
