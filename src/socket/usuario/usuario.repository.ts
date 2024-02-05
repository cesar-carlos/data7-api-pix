import { eContext } from '../../dependency/container.dependency';
import { params } from '../../contracts/local.base.params';

import AppDependencys from '../../aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../contracts/local.base.repository.contract';
import LocalBaseRepositorySequenceContract from '../../contracts/local.base.repository.sequence.contract';
import LocalBaseConsultaRepositoryContract from '../../contracts/local.base.consulta.repository.contract';
import UsuarioConsultaDto from '../../dto/common.data/usuario.consulta.dto';
import SequenceDto from '../../dto/common.data/sequence.dto';
import UsuarioDto from '../../dto/common.data/usuario';

export default class UsuarioRepository {
  public async consulta(params: params[] | string = []): Promise<UsuarioConsultaDto[]> {
    const repository = this.repositoryConsulta();
    const result = await repository.selectWhere(params);
    return result as UsuarioConsultaDto[];
  }

  public async select(params: params[] | string = []): Promise<UsuarioDto[]> {
    const repository = this.repository();
    return await repository.selectWhere(params);
  }

  public async insert(separars: UsuarioDto[]): Promise<void> {
    throw new Error('Not implemented');
  }

  public async update(separars: UsuarioDto[]): Promise<void> {
    throw new Error('Not implemented');
  }

  public async delete(separars: UsuarioDto[]): Promise<void> {
    throw new Error('Not implemented');
  }

  public async sequence(): Promise<SequenceDto | undefined> {
    const name = 'Usuario_Sequencia';
    const repository = this.sequenceRepository();
    return await repository.select(name);
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<UsuarioDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<UsuarioDto>',
    });
  }

  private repositoryConsulta() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<UsuarioConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<UsuarioConsultaDto>',
    });
  }

  private sequenceRepository() {
    return AppDependencys.resolve<LocalBaseRepositorySequenceContract<SequenceDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
    });
  }
}
