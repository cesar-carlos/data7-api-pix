import { v4 as uuidv4 } from 'uuid';

import GerencianetCreateChaveAdapter from '../adapter/gerencianet.create.chave.adapter';
import Chave from '../entities/chave';

export default class CreateGnChaveService {
  constructor() {}
  public async executar(): Promise<Chave> {
    try {
      const gerencianet = new GerencianetCreateChaveAdapter();
      const response = await gerencianet.execute();
      const chave = new Chave(null, null, null, uuidv4(), response.status, response.dataCriacao, response.chave);
      return chave;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
