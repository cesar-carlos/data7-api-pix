import { responseCreateChaveDto } from '../dto/response.create.chave.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreateTokenAdapter extends GerencianetBase {
  public async execute(): Promise<responseCreateChaveDto> {
    try {
      const response = await this.gerencianet.gnCreateEvp();
      const token: responseCreateChaveDto = {
        status: 'Ativo',
        dataCriacao: new Date(),
        chave: response.chave,
      };

      return token;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
