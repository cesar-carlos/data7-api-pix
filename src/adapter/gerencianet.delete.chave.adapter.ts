import GerencianetBase from './gerencianet.base';

export default class GerencianetDeleteChaveAdapter extends GerencianetBase {
  public async execute(chave: string): Promise<void> {
    try {
      await this.gerencianet.gnDeleteEvp(chave);
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
