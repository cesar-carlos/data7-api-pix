import { params, Pagination, OrderBy } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSeparacaoResumoConsultaDto from '../../dto/expedicao/expedicao.item.separacao.resumo.consulta.dto';
import ExpedicaoItemSeparacaoConsultaDto from '../../dto/expedicao/expedicao.item.separacao.consulta.dto';
import ExpedicaoItemSeparacaoDto from '../../dto/expedicao/expedicao.item.separacao.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class SeparacaoItemRepository {
  public async consultaResumo(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemSeparacaoResumoConsultaDto[]> {
    try {
      const repository = this.repositoryResumoConsulta();
      const result = await repository.selectWhere(params, pagination, orderBy);
      return result as ExpedicaoItemSeparacaoResumoConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async consulta(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemSeparacaoConsultaDto[]> {
    try {
      const repository = this.repositoryConsulta();
      const result = await repository.selectWhere(params, pagination, orderBy);
      return result as ExpedicaoItemSeparacaoConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemSeparacaoDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params, pagination, orderBy);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(models: ExpedicaoItemSeparacaoDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(models: ExpedicaoItemSeparacaoDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(models: ExpedicaoItemSeparacaoDto[]): Promise<void> {
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
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConsultaDto>',
    });
  }

  private repositoryResumoConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoResumoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoResumoConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>',
    });
  }
}
