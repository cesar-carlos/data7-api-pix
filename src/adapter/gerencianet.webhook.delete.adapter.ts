import GerencianetBase from './gerencianet.base';

export default class GerencianetWebhookDeleteAdapter extends GerencianetBase {
  public async execute(chave: string): Promise<any> {
    try {
      const params = { chave };
      const respose = await this.gerencianet.pixDeleteWebhook(params);
      return respose;
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
