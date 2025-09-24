import { params, Pagination, OrderBy } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemConferenciaConsultaDto from '../../dto/expedicao/expedicao.item.conferencia.consulta.dto';
import ExpedicaoItemConferenciaDto from '../../dto/expedicao/expedicao.item.conferencia.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class ConferenciaItemRepository {
  public async consulta(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemConferenciaConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params, pagination, orderBy);
    return result as ExpedicaoItemConferenciaConsultaDto[];
  }

  public async select(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemConferenciaDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params, pagination, orderBy);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(models: ExpedicaoItemConferenciaDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(models: ExpedicaoItemConferenciaDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(models: ExpedicaoItemConferenciaDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
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
