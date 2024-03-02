import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import ExpedicaoCancelamentoDto from '../../dto/expedicao/expedicao.cancelamento.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class CancelamentoRepository {
  public async select(params: params[] | string = []): Promise<ExpedicaoCancelamentoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(cancelamentos: ExpedicaoCancelamentoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of cancelamentos) {
      await repository.insert(el);
    }
  }

  public async update(cancelamentos: ExpedicaoCancelamentoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of cancelamentos) {
      await repository.update(el);
    }
  }

  public async delete(cancelamentos: ExpedicaoCancelamentoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of cancelamentos) {
      await repository.delete(el);
    }
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    const name = 'Cancelamento_Sequencia_1';
    const repository = this.sequenceRepository();
    return await repository.select(name);
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCancelamentoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCancelamentoDto>',
    });
  }
}
