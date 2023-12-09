import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemConferirConsultaDto from '../../dto/expedicao/expedicao.item.conferir.consulta.dto';
import ExpedicaoItemConferirDto from '../../dto/expedicao/expedicao.item.conferir.dto';
import ExpedicaoItemSeparacaoConferirConsultaDto from '../../dto/expedicao/expedicao.item.separacao.conferir.consulta.dto';

export default class ConferirItemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemConferirConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemConferirConsultaDto[];
  }

  public async consultaConferirSeparacao(
    params: params[] | string = [],
  ): Promise<ExpedicaoItemSeparacaoConferirConsultaDto[]> {
    const repository = this.repositoryConferirSeparacaoConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemSeparacaoConferirConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemConferirDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(itensConferir: ExpedicaoItemConferirDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itensConferir) {
      await repository.insert(el);
    }
  }

  public async update(itensConferir: ExpedicaoItemConferirDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itensConferir) {
      await repository.update(el);
    }
  }

  public async delete(itensConferir: ExpedicaoItemConferirDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of itensConferir) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemConferirConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemConferirConsultaDto>',
    });
  }

  private repositoryConferirSeparacaoConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConferirConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemSeparacaoConferirConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemConferirDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemConferirDto>',
    });
  }
}
