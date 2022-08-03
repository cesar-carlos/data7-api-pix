import { v4 as uuidv4 } from 'uuid';

import GerencianetCreateChaveAdapter from '../adapter/gerencianet.create.chave.adapter';
import Chave from '../entities/chave';

export default class CreateGnChaveService {
  constructor() {}
  public async executar(): Promise<Chave> {
    try {
      const gerencianet = new GerencianetCreateChaveAdapter();
      const responseChave = await gerencianet.execute();
      const chave: Chave = {
        uuid: uuidv4(),
        status: responseChave.status,
        dataCriacao: responseChave.dataCriacao,
        chave: responseChave.chave,
      };

      return chave;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
