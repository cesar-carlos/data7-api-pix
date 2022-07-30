import { responseListChaveDto } from '../dto/response.list.chave.dto';
import { ChaveStatusType } from '../type/chave.status.type';
import GerencianetBase from './gerencianet.base';

export default class GerencianetListChaveAdapter extends GerencianetBase {
  public async execute(): Promise<responseListChaveDto> {
    try {
      const response = await this.gerencianet.gnListEvp();
      const chaveStatusType: ChaveStatusType = { status: 'ativo' };
      const tokens: responseListChaveDto = response?.chaves.map((key: any) => {
        return { status: chaveStatusType.status, dataCriacao: new Date(), chave: key };
      });

      return tokens;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}

//respose 200
//   parametros: {
//     inicio: '2021-01-01T00:00:00.000Z',
//     fim: '2023-01-31T00:00:00.000Z',
//     paginacao: {
//       paginaAtual: 0,
//       itensPorPagina: 100,
//       quantidadeDePaginas: 1,
//       quantidadeTotalDeItens: 1
//     }
//   },
//   webhooks: [
//     {
//       webhookUrl: 'https://api.se7sistemas.com/webhook',
//       chave: 'bc89689b-11bc-4304-b2c4-c474e90e2467',
//       criacao: '2022-07-28T02:55:42.000Z'
//     }
//   ]
// }
