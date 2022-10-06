import { responseListLocDto } from '../dto/response.list.loc.dto';

import GerencianetBase from './gerencianet.base';

export default class GerencianetListLocAdapter extends GerencianetBase {
  async execute(startDate: Date, endDate: Date, page: number = 1): Promise<responseListLocDto> {
    try {
      const dataInicio = startDate.toISOString();
      const dataFim = endDate.toISOString();
      const params = { inicio: dataInicio, fim: dataFim };

      const response = await this.gerencianet.pixListLocation(params);
      const result: responseListLocDto = response.data.map((item: any) => {
        return {
          id: item.id,
          location: item.loc.location,
          tipoCob: item.loc.tipoCob,
          criacao: new Date(item.loc.criacao),
          txid: item.txid,
        };
      });

      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
