import { eContext } from '../dependency/container.dependency';
import AppDependencys from '../aplication/app.dependencys';
import LocalBaseConsultaRepositoryContract from '../contracts/local.base.consulta.repository.contract';
import UsuarioConsultaDto from '../dto/common.data/usuario.consulta.dto';

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default class UsuarioConsultaService {
  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<UsuarioConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<UsuarioConsultaDto>',
    });
  }

  public async consultarTodos(page: number = 1, limit: number = 100): Promise<PaginatedResult<UsuarioConsultaDto>> {
    try {
      const offset = (page - 1) * limit;
      const repository = this.repository();

      const usuarios = await repository.select({ limit, offset });

      const startIndex = offset;
      const endIndex = startIndex + limit;
      const paginatedUsers = usuarios.slice(startIndex, endIndex);

      const total = usuarios.length;
      const totalPages = Math.ceil(total / limit);

      return {
        data: paginatedUsers,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuários: ${error.message}`);
    }
  }

  public async consultarPorCodigo(codUsuario: number): Promise<UsuarioConsultaDto | null> {
    try {
      const repository = this.repository();
      const usuarios = await repository.selectWhere([`CodUsuario = ${codUsuario}`]);

      return usuarios.length > 0 ? usuarios[0] : null;
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuário por código: ${error.message}`);
    }
  }

  public async consultarPorNome(
    nome: string,
    page: number = 1,
    limit: number = 100,
  ): Promise<PaginatedResult<UsuarioConsultaDto>> {
    try {
      const offset = (page - 1) * limit;
      const repository = this.repository();
      const usuarios = await repository.selectWhere([`NomeUsuario = '${nome}'`]);

      const startIndex = offset;
      const endIndex = startIndex + limit;
      const paginatedUsers = usuarios.slice(startIndex, endIndex);

      const total = usuarios.length;
      const totalPages = Math.ceil(total / limit);

      return {
        data: paginatedUsers,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuário por nome: ${error.message}`);
    }
  }

  public async consultarAtivos(page: number = 1, limit: number = 100): Promise<PaginatedResult<UsuarioConsultaDto>> {
    try {
      const repository = this.repository();
      const usuarios = await repository.selectWhere([`Ativo = 'S'`]);

      const offset = (page - 1) * limit;
      const startIndex = offset;
      const endIndex = startIndex + limit;
      const paginatedUsers = usuarios.slice(startIndex, endIndex);

      const total = usuarios.length;
      const totalPages = Math.ceil(total / limit);

      return {
        data: paginatedUsers,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuários ativos: ${error.message}`);
    }
  }

  public async consultarPorEmpresa(
    codEmpresa: number,
    page: number = 1,
    limit: number = 100,
  ): Promise<PaginatedResult<UsuarioConsultaDto>> {
    try {
      const offset = (page - 1) * limit;
      const repository = this.repository();
      const usuarios = await repository.selectWhere([`CodEmpresa = ${codEmpresa}`]);

      const startIndex = offset;
      const endIndex = startIndex + limit;
      const paginatedUsers = usuarios.slice(startIndex, endIndex);

      const total = usuarios.length;
      const totalPages = Math.ceil(total / limit);

      return {
        data: paginatedUsers,
        total,
        page,
        limit,
        totalPages,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuários por empresa: ${error.message}`);
    }
  }
}
