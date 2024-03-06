import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoItemConferirConsultaDto from '../../dto/expedicao/expedicao.item.conferir.consulta.dto';
import ExpedicaoItemConferirDto from '../../dto/expedicao/expedicao.item.conferir.dto';
import ExpedicaoItemSeparacaoConferirConsultaDto from '../../dto/expedicao/expedicao.item.separacao.conferir.consulta.dto';
import ExpedicaoItemConferirUnidadeMedidaConsultaDto from '../../dto/expedicao/expedicao.item.conferir.unidade.medida.consulta.dto';

export default class ConferirItemRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoItemConferirConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoItemConferirConsultaDto[];
  }

  public async consultaUnidadeMedida(
    params: params[] | string = [],
  ): Promise<ExpedicaoItemConferirUnidadeMedidaConsultaDto[]> {
    try {
      const repository = this.repositoryUnidadeMedidaConsulta();
      const result = await repository.selectWhere(params);
      return result as ExpedicaoItemConferirUnidadeMedidaConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async consultaConferirSeparacao(
    params: params[] | string = [],
  ): Promise<ExpedicaoItemSeparacaoConferirConsultaDto[]> {
    try {
      const repository = this.repositoryConferirSeparacaoConsulta();
      const result = await repository.selectWhere(params);
      return result as ExpedicaoItemSeparacaoConferirConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoItemConferirDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(itensConferir: ExpedicaoItemConferirDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of itensConferir) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(itensConferir: ExpedicaoItemConferirDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of itensConferir) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(itensConferir: ExpedicaoItemConferirDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of itensConferir) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
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

  private repositoryUnidadeMedidaConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoItemConferirUnidadeMedidaConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoItemConferirUnidadeMedidaConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoItemConferirDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoItemConferirDto>',
    });
  }
}
