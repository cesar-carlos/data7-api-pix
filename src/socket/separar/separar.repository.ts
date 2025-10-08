import { eContext } from '../../dependency/container.dependency';
import { Params, Pagination, OrderBy } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import ExpedicaoProgressoSeparacaoConsultaDto from '../../dto/expedicao/expedicao.progresso.separacao.consulta.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoSepararConsultaDto from '../../dto/expedicao/expedicao.separar.consulta.dto';
import ExpedicaoSepararDto from '../../dto/expedicao/expedicao.separar.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class SepararRepository {
  public async consulta(
    params: Params[] = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoSepararConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params, pagination, orderBy);
    return result as ExpedicaoSepararConsultaDto[];
  }

  public async consultaProgressoSeparacao(
    params: Params[] = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoProgressoSeparacaoConsultaDto[]> {
    const repository = this.repositoryConsultaProgressoSeparacao();
    const result = await repository.selectWhere(params, pagination, orderBy);
    return result as ExpedicaoProgressoSeparacaoConsultaDto[];
  }

  public async select(
    params: Params[] = [],
    pagination?: Pagination,
    orderBy?: OrderBy,
  ): Promise<ExpedicaoSepararDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params, pagination, orderBy);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(models: ExpedicaoSepararDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(models: ExpedicaoSepararDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(models: ExpedicaoSepararDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of models) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    try {
      const name = 'Expedicao.SepararEstoque_Sequencia_1';
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

  private repositoryConsultaProgressoSeparacao() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoProgressoSeparacaoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoProgressoSeparacaoConsultaDto>',
    });
  }
}
