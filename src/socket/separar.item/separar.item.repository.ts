import { eContext } from '../../dependency/container.dependency';
import { params, Pagination, OrderBy } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSepararUnidadeMedidaConsultaDto from '../../dto/expedicao/expedicao.item.separar.unidade.medida.consulta.dto';
import ExpedicaoItemSepararConsultaDto from '../../dto/expedicao/expedicao.item.separar.consulta.dto';
import ExpedicaoItemSepararDto from '../../dto/expedicao/expedicao.item.separar.dto';

export default class SepararItemRepository {
  public async consulta(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemSepararConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params, pagination, orderBy);
    return result as ExpedicaoItemSepararConsultaDto[];
  }

  public async consultaUnidadeMedida(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemSepararUnidadeMedidaConsultaDto[]> {
    try {
      const repository = this.repositoryUnidadeMedidaConsulta();
      const result = await repository.selectWhere(params, pagination, orderBy);
      return result as ExpedicaoItemSepararUnidadeMedidaConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(
    params: params[] | string = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoItemSepararDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params, pagination, orderBy);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(models: ExpedicaoItemSepararDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(models: ExpedicaoItemSepararDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(models: ExpedicaoItemSepararDto[]): Promise<void> {
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
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararConsultaDto>',
    });
  }

  private repositoryUnidadeMedidaConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararUnidadeMedidaConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSepararUnidadeMedidaConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemSepararDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSepararDto>',
    });
  }
}
