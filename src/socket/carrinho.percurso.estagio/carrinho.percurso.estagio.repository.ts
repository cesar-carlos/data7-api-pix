import { params } from '../../contracts/local.base.params';
import { eContext } from '../../dependency/container.dependency';

import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import ExpedicaoCarrinhoPercursoEstagioDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.dto';
import ExpedicaoCarrinhoPercursoEstagioConsultaDto from '../../dto/expedicao/expedicao.carrinho.percurso.estagio.consulta.dto';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import AppDependencys from '../../aplication/app.dependencys';

export default class CarrinhoPercursoEstagioRepository {
  public async consulta(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoEstagioConsultaDto[]> {
    try {
      const repository = this.repositoryConsulta();
      const result = await repository.selectWhere(params);
      return result as ExpedicaoCarrinhoPercursoEstagioConsultaDto[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async select(params: params[] | string = []): Promise<ExpedicaoCarrinhoPercursoEstagioDto[]> {
    try {
      const repository = this.repository();
      return await repository.selectWhere(params);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async insert(carrinhoPercursoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of carrinhoPercursoEstagios) {
        await repository.insert(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(carrinhoPercursoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of carrinhoPercursoEstagios) {
        await repository.update(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async delete(carrinhoPercursoEstagios: ExpedicaoCarrinhoPercursoEstagioDto[]): Promise<void> {
    try {
      const repository = this.repository();
      for (const el of carrinhoPercursoEstagios) {
        await repository.delete(el);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoEstagioConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoCarrinhoPercursoEstagioConsultaDto>',
    });
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoCarrinhoPercursoEstagioDto>',
    });
  }
}
