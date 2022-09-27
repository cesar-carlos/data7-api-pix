import { responseListPixDto } from '../dto/response.list.pix.dto';

import GerencianetBase from './gerencianet.base';

export default class GerencianetListPixAdapter extends GerencianetBase {
  async execute(startDate: Date, endDate: Date, page: number = 1): Promise<responseListPixDto> {
    try {
      const dataInicio = startDate.toISOString();
      const dataFim = endDate.toISOString();
      const params = { inicio: dataInicio, fim: dataFim };

      const response = await this.gerencianet.pixListReceived(params);
      const result: responseListPixDto = response.pix.map((pix: any) => {
        return {
          endToEndId: pix.endToEndId,
          txid: pix.txid,
          valor: parseFloat(pix.valor),
          chave: pix.chave,
          horario: new Date(pix.horario),
        };
      });

      return result;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
