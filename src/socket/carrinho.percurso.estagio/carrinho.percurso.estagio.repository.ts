import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import ExpedicaoCarrinhoPercursoConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.consulta.dto';

export default class CarrinhoPercursoEstagioRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as ExpedicaoCarrinhoPercursoConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(carrinhoPercursoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhoPercursoEstagios) {
      await repository.insert(el);
    }
  }

  public async update(carrinhoPercursoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhoPercursoEstagios) {
      await repository.update(el);
    }
  }

  public async delete(carrinhoPercursoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[]): Promise<void> {
    const repository = this.repository();
    for (const el of carrinhoPercursoEstagios) {
      await repository.delete(el);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>',
    });
  }
}
