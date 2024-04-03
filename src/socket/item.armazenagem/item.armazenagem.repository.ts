import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemArmazenagemConsultaDto from '../../dto/expedicao/expedicao.item.armazenagem.consulta.dto';
import ExpedicaoItemArmazenagemDto from '../../dto/expedicao/expedicao.item.armazenagem.dto';
import AppDependencys from '../../aplication/app.dependencys';

export default class ItemArmazenagemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemArmazenagemConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemArmazenagemConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemArmazenagemDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(models: ExpedicaoItemArmazenagemDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(models: ExpedicaoItemArmazenagemDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(models: ExpedicaoItemArmazenagemDto[]): Promise<void> {
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
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemArmazenagemConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemArmazenagemConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemArmazenagemDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemArmazenagemDto>',
    });
  }
}
