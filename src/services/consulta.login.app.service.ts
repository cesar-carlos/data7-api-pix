import { eContext } from '../dependency/container.dependency';
import LocalBaseConsultaRepositoryContract from '../contracts/local.base.consulta.repository.contract';
import ExpedicaoLoginAppConsultaDto from '../dto/expedicao/expedicao.login.app.consulta.dto';
import AppDependencys from '../aplication/app.dependencys';

export interface PaginatedResult {
  data: ExpedicaoLoginAppConsultaDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  offset: number;
}

export default class ConsultaLoginAppService {
  public async consultarTodos(page: number = 1, limit: number = 100): Promise<PaginatedResult> {
    try {
      const repository = this.repository();
      const offset = (page - 1) * limit;

      // Buscar os dados paginados
      const users = await repository.select({ limit, offset });

      // Para obter o total, fazemos uma consulta sem limite
      const allUsers = await repository.select({ limit: 999999, offset: 0 });
      const total = allUsers.length;
      const totalPages = Math.ceil(total / limit);

      return {
        data: users,
        total,
        page,
        limit,
        totalPages,
        offset,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar todos os usuários: ${error.message}`);
    }
  }

  public async consultarPorNome(nome: string, page: number = 1, limit: number = 100): Promise<PaginatedResult> {
    try {
      const repository = this.repository();

      // Buscar todos os usuários com o nome para contar o total
      const allUsers = await repository.selectWhere([{ key: 'Nome', operator: '=', value: nome }]);

      const total = allUsers.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;

      // Buscar apenas a página solicitada
      const users = allUsers.slice(offset, offset + limit);

      return {
        data: users,
        total,
        page,
        limit,
        totalPages,
        offset,
      };
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuários por nome: ${error.message}`);
    }
  }

  public async consultarPorCodigo(codLoginApp: number): Promise<ExpedicaoLoginAppConsultaDto | null> {
    try {
      const repository = this.repository();

      const users = await repository.selectWhere([{ key: 'CodLoginApp', operator: '=', value: codLoginApp }]);

      if (users.length === 0) {
        return null;
      }

      return users[0];
    } catch (error: any) {
      throw new Error(`Erro ao consultar usuário por código: ${error.message}`);
    }
  }

  public async consultarAtivos(page: number = 1, limit: number = 100): Promise<PaginatedResult> {
    try {
      const repository = this.repository();

      // Buscar todos os usuários ativos para contar o total
      const allUsers = await repository.selectWhere([{ key: 'Ativo', operator: '=', value: 'S' }]);

      const total = allUsers.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;

      // Buscar apenas a página solicitada
      const users = allUsers.slice(offset, offset + limit);

      return {
        data: users,
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

  private repository() {
    return AppDependencys.resolve<LocalBaseConsultaRepositoryContract<ExpedicaoLoginAppConsultaDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseConsultaRepositoryContract<ExpedicaoLoginAppConsultaDto>',
    });
  }
}
