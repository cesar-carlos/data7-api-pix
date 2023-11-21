import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import EstoqueProdutoConsultaDto from '../../dto/common.data/estoque.produto.consulta.dto';
import EstoqueProdutoDto from '../../dto/common.data/estoque.produto.dto';

export default class EstoqueProdutoRepository {
  public async consulta(params: params[] | string = []): Promise<EstoqueProdutoConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as EstoqueProdutoConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<EstoqueProdutoDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(produtos: EstoqueProdutoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of produtos) {
      await repository.insert(el);
    }
  }

  public async update(produtos: EstoqueProdutoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of produtos) {
      await repository.update(el);
    }
  }

  public async delete(produtos: EstoqueProdutoDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of produtos) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<EstoqueProdutoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<EstoqueProdutoConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<EstoqueProdutoDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<EstoqueProdutoDto>',
    });
  }
}
