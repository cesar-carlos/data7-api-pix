import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';

export default class SepararRepository {
  public async select(params: params[] | string = []): Promise<ExpedicaoSepararDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(separars: ExpedicaoSepararDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of separars) {
      await repository.insert(el);
    }
  }

  public async update(separars: ExpedicaoSepararDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of separars) {
      await repository.update(el);
    }
  }

  public async delete(separars: ExpedicaoSepararDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of separars) {
      await repository.delete(el);
    }
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoSepararDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoSepararDto>',
    });
  }
}
