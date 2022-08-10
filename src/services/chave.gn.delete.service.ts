import GerencianetDeleteChaveAdapter from '../adapter/gerencianet.delete.chave.adapter';
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
