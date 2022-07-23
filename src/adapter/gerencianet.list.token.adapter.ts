import { responseListChaveDto } from '../dto/response.list.chave.dto';
import GerencianetBase from './gerencianet.base';

export default class GerencianetListTokenAdapter extends GerencianetBase {
  public async execute(): Promise<responseListChaveDto> {
    try {
      const response = await this.gerencianet.gnListEvp();
      const tokens: responseListChaveDto = response?.chaves.map((key: any) => {
        return {
          status: 'Ativo',
          dataCriacao: new Date(),
          chave: key,
        };
      });

      return tokens;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
