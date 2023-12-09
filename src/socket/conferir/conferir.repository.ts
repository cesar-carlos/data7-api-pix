import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import ExpedicaoCarrinhoConferirConsultaDto from '../../dto/expedicao/expedicao.carrinho.conferir.consulta.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoConferirConsultaDto from '../../dto/expedicao/expedicao.conferir.consulta.dto';
import ExpedicaoConferirDto from '../../dto/expedicao/expedicao.conferir.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class ConferirRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoConferirConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoConferirConsultaDto[];
  }

  public async carrinhoConferirConsulta(
    params: params[] | string = [],
  ): Promise<ExpedicaoCarrinhoConferirConsultaDto[]> {
    const repository = this.repositoryCarrinhoConferirConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoCarrinhoConferirConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoConferirDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(conferirs: ExpedicaoConferirDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of conferirs) {
      await repository.insert(el);
    }
  }

  public async update(conferirs: ExpedicaoConferirDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of conferirs) {
      await repository.update(el);
    }
  }

  public async delete(conferirs: ExpedicaoConferirDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of conferirs) {
      await repository.delete(el);
    }
  }

  //TODO:: CRIAR SEQUNCIA PARA REMOVER UNDEFINED
  public async sequence(): Promise<SequenceDto | undefined> {
    const name = 'Expedicao.ConferirEstoque_Sequencia_1';
    const repository = this.sequenceRepository();
    return await repository.select(name);
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoConferirDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoConferirDto>',
    });
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoConferirConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoConferirConsultaDto>',
    });
  }

  private repositoryCarrinhoConferirConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConferirConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoConferirConsultaDto>',
    });
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
