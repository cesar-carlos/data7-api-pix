import { v4 as uuidv4 } from 'uuid';

import GerencianetDeleteChaveAdapter from '../adapter/gerencianet.delete.chave.adapter';
import ChaveDto from '../dto/chave.dto';
import Chave from '../entities/chave';

export default class ChaveGnDeleteService {
  private readonly gerencianet = new GerencianetDeleteChaveAdapter();
  constructor() {}
  public async execute(chave: Chave): Promise<void> {
    try {
      await this.gerencianet.execute(chave.chave);
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
