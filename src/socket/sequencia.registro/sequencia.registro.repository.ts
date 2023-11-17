import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import SequenceDto from '../../dto/common.data/sequence.dto';
import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';

export default class SequenciaRegistroRepository {
  public async select(name: string): Promise<SequenceDto | undefined> {
    const repository = this.repository();
    return await repository.select(name);
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
