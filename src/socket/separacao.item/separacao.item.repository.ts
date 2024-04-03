import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemSeparacaoConsultaDto from '../../dto/expedicao/expedicao.item.separacao.consulta.dto';
import ExpedicaoItemSeparacaoDto from '../../dto/expedicao/expedicao.item.separacao.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class SeparacaoItemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemSeparacaoConsultaDto[]> {
    try {
      const repository = this.repositoryConsulta();
      const result = await repository.selectWhere(params);
      return result as ExpedicaoItemSeparacaoConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemSeparacaoDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
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

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemSeparacaoDto>',
    });
  }
}
