import { eContext } from '../dependency/container.dependency';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import ExpedicaoLoginAppDto from '../dto/expedicao/expedicao.login.app.dto';
import AppDependencys from '../aplication/app.dependencys';
import { PasswordHelper } from '../helper/password.helper';

export default class LoginAppService {
  public async authenticate(data: { Nome: string; Senha: string }): Promise<ExpedicaoLoginAppDto | null> {
    try {
      const repository = this.repository();

      const users = await repository.selectWhere([
        { key: 'Nome', operator: '=', value: data.Nome },
        { key: 'Ativo', operator: '=', value: 'S' },
      ]);

      if (users.length === 0) {
        return null;
      }

      const user = users[0];
      const isPasswordValid = await PasswordHelper.verifyPassword(data.Senha, user.Senha);

      if (!isPasswordValid) {
        return null;
      }

      return new ExpedicaoLoginAppDto({
        CodLoginApp: user.CodLoginApp,
        Ativo: user.Ativo,
        Nome: user.Nome,
        Senha: '',
        CodUsuario: user.CodUsuario,
        FotoUsuario: user.FotoUsuario,
      });
    } catch (error: any) {
      throw new Error(`Erro ao autenticar usuário: ${error.message}`);
    }
  }

  public async FindByName(name: string): Promise<ExpedicaoLoginAppDto | null> {
    try {
      const repository = this.repository();
      const result = await repository.selectWhere([['Nome', 'LIKE', `'${name}'`]]);
      if (result.length > 0) return result[0];
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async FindById(id: number): Promise<ExpedicaoLoginAppDto | null> {
    try {
      const repository = this.repository();
      const result = await repository.selectWhere([['CodLoginApp', '=', `${id}`]]);
      if (result.length > 0) return result[0];

      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  private repository() {
    return AppDependencys.resolve<LocalBaseRepositoryContract<ExpedicaoLoginAppDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<ExpedicaoLoginAppDto>',
    });
  }
}
