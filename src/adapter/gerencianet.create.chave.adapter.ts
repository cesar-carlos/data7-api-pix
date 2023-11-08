import { responseCreateChaveDto } from '../dto/api.responses/response.create.chave.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetCreateChaveAdapter extends GerencianetBase {
  public async execute(): Promise<responseCreateChaveDto> {
    try {
      const response = await this.gerencianet.gnCreateEvp();
      const chave: responseCreateChaveDto = {
        status: 'Ativo',
        dataCriacao: new Date(),
        chave: response.chave,
      };

      return chave;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
