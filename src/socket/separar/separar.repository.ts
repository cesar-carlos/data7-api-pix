import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoSepararConsultaDto from '../../dto/expedicao/expedicao.separar.consulta.dto';
import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class SepararRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoSepararConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoSepararConsultaDto[];
  }

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

  //TODO:: CRIAR SEQUNCIA PARA REMOVER UNDEFINED
  public async sequence(): Promise<SequenceDto | undefined> {
    const name = 'Expedicao.SepararEstoque_Sequencia_1';
    const repository = this.sequenceRepository();
    return await repository.select(name);
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoSepararDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoSepararDto>',
    });
  }
  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoSepararConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoSepararConsultaDto>',
    });
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
