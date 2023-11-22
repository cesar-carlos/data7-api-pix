import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSeparacaoConsultaDto from '../../dto/expedicao/expedicao.item.separacao.consulta.dto';
import ExpedicaoItemSeparacaoDto from '../../dto/expedicao/expedicao.item.separacao.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class SeparacaoItemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemSeparacaoConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemSeparacaoConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemSeparacaoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(itemSeparacao: ExpedicaoItemSeparacaoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itemSeparacao) {
      await repository.insert(el);
    }
  }

  public async update(itemSeparacao: ExpedicaoItemSeparacaoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itemSeparacao) {
      await repository.update(el);
    }
  }

  public async delete(itemSeparacao: ExpedicaoItemSeparacaoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itemSeparacao) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>',
    });
  }
}
