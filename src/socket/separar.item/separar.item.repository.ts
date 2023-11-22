import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSepararConsultaDto from '../../dto/expedicao/expedicao.item.separar.consulta.dto';
import ExpedicaoItemSepararDto from '../../dto/expedicao/expedicao.item.separar.dto';

export default class SepararItemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemSepararConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemSepararConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemSepararDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(itensSeparar: ExpedicaoItemSepararDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itensSeparar) {
      await repository.insert(el);
    }
  }

  public async update(itensSeparar: ExpedicaoItemSepararDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itensSeparar) {
      await repository.update(el);
    }
  }

  public async delete(itensSeparar: ExpedicaoItemSepararDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itensSeparar) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemSepararDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSepararDto>',
    });
  }
}
