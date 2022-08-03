import { v4 as uuidv4 } from 'uuid';

import GerencianetListChaveAdapter from '../adapter/gerencianet.list.chave.adapter';
import Chave from '../entities/chave';

export default class ChaveGnCobrancaService {
  private readonly gerencianet = new GerencianetListChaveAdapter();
  constructor() {}
  public async execute(): Promise<Chave[]> {
    try {
      const responseChave = await this.gerencianet.execute();
      const chaves = responseChave?.map((item: any) => {
        return new Chave(uuidv4(), item.status, item.dataCriacao, item.chave);
      });

      return chaves;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
