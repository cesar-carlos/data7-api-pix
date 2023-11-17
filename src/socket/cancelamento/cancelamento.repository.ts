import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCancelamentoDto from '../../dto/expedicao/expedicao.cancelamento.dto';
import AppDependencys from '../../aplication/app.dependencys';

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

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCancelamentoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCancelamentoDto>',
    });
  }
}
