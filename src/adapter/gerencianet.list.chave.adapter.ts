import { ResponseChaveDto } from '../dto/api.responses/response.chave.dto';
import { ChaveStatusType } from '../type/chave.status.type';

import GerencianetBase from './gerencianet.base';

export default class GerencianetListChaveAdapter extends GerencianetBase {
  public async execute(): Promise<ResponseChaveDto[]> {
    try {
      const response = await this.gerencianet.gnListEvp();
      const chaveStatusType: ChaveStatusType = { status: 'ativo' };
      const chaves: ResponseChaveDto[] = response?.chaves.map((key: any) => {
        return { status: chaveStatusType.status, dataCriacao: new Date(), chave: key };
      });

      return chaves;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
