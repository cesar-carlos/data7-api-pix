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
  offset: number;
}

interface PaginationOptions {
  page?: number;
  offset?: number;
  limit: number;
}

export default class UsuarioConsultaService {
  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<UsuarioConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<UsuarioConsultaDto>',
    });
  }

  public async consultarTodos(page: number, limit: number): Promise<PaginatedResult<UsuarioConsultaDto>>;
  public async consultarTodos(options: PaginationOptions): Promise<PaginatedResult<UsuarioConsultaDto>>;

  public async consultarTodos(
    pageOrOptions: number | PaginationOptions = 1,
    limit: number = 100,
  ): Promise<PaginatedResult<UsuarioConsultaDto>> {
    try {
      let page: number;
      let offset: number;
      let actualLimit: number;

      if (typeof pageOrOptions === 'object') {
        // Usando options object
        actualLimit = pageOrOptions.limit;
        if (pageOrOptions.offset !== undefined) {
          offset = pageOrOptions.offset;
          page = Math.floor(offset / actualLimit) + 1;
        } else {
          page = pageOrOptions.page || 1;
          offset = (page - 1) * actualLimit;
        }
      } else {
        // Usando parâmetros separados (backward compatibility)
        page = pageOrOptions;
        actualLimit = limit;
        offset = (page - 1) * actualLimit;
      }

      const repository = this.repository();
      const usuarios = await repository.select({ limit: actualLimit, offset, page });

      const startIndex = offset;
      const endIndex = startIndex + actualLimit;
      const paginatedUsers = usuarios.slice(startIndex, endIndex);

      const total = usuarios.length;
      const totalPages = Math.ceil(total / actualLimit);

      return {
        data: paginatedUsers,
        total,
        page,
        limit: actualLimit,
        totalPages,
        offset,
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
        offset,
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
        offset,
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
        offset,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuários por empresa: ${error.message}`);
    }
  }
}
