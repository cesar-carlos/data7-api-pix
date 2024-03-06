import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import ProcessoExecutavelDto from '../../dto/common.data/processo.executavel.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class ProcessoExecutavelRepository {
  public async select(params: params[] | string = []): Promise<ProcessoExecutavelDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(processoExecutavel: ProcessoExecutavelDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of processoExecutavel) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(processoExecutavel: ProcessoExecutavelDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of processoExecutavel) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(processoExecutavel: ProcessoExecutavelDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of processoExecutavel) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    try {
      const name = 'ProcessoExecutavel_Sequencia_1';
      const repository = this.sequenceRepository();
      return await repository.select(name);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ProcessoExecutavelDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ProcessoExecutavelDto>',
    });
  }
}
