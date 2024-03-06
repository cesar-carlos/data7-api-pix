import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import EstoqueConversaoUnidadeConsultaDto from '../../dto/common.data/estoque.conversao.unidade.consulta.dto';
import EstoqueConversaoUnidadeDto from '../../dto/common.data/estoque.conversao.unidade.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';

export default class EstoqueConversaoUnidadeRepository {
  public async consulta(params: params[] | string = []): Promise<EstoqueConversaoUnidadeConsultaDto[]> {
    try {
      const repository = this.repositoryConsulta();
      const result = await repository.selectWhere(params);
      return result as EstoqueConversaoUnidadeConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(params: params[] | string = []): Promise<EstoqueConversaoUnidadeDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(produtos: EstoqueConversaoUnidadeDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of produtos) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(produtos: EstoqueConversaoUnidadeDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of produtos) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(produtos: EstoqueConversaoUnidadeDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of produtos) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    try {
      const name = 'Produto_Sequencia';
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

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<EstoqueConversaoUnidadeConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<EstoqueConversaoUnidadeConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<EstoqueConversaoUnidadeDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<EstoqueConversaoUnidadeDto>',
    });
  }
}
