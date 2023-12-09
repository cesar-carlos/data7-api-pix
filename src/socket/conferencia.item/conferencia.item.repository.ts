import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemConferenciaConsultaDto from '../../dto/expedicao/expedicao.item.conferencia.consulta.dto';
import ExpedicaoItemConferenciaDto from '../../dto/expedicao/expedicao.item.conferencia.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class ConferenciaItemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemConferenciaConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemConferenciaConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemConferenciaDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(itemConferencia: ExpedicaoItemConferenciaDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itemConferencia) {
      await repository.insert(el);
    }
  }

  public async update(itemConferencia: ExpedicaoItemConferenciaDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itemConferencia) {
      await repository.update(el);
    }
  }

  public async delete(itemConferencia: ExpedicaoItemConferenciaDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itemConferencia) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemConferenciaConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemConferenciaConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemConferenciaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemConferenciaDto>',
    });
  }
}