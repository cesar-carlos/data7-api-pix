import GerencianetConfigWebhook from '../adapter/gerencianet.config.webhook';
import GerencianetListWebhook from '../adapter/gerencianet.list.webhook';
import ChaveDto from '../dto/chave.dto';
import Chave from '../entities/chave';
import ProcessInfo from '../entities/process.info';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';
import ChavesGnCobrancaServices from './chaves.gn.cobranca.service';

export default class WebhookGnConfigService {
  private gerencianetConfigWebhook = new GerencianetConfigWebhook();
  constructor() {}

  public async execute(): Promise<any> {
    try {
      const rawUrl = process.env.WEBHOOK_GN_URL;
      if (!rawUrl) {
        throw new Error('PROCESS.ENV WEBHOOK_URL NOT FOUND');
      }

      const _chavesGnCobrancaServices = new ChavesGnCobrancaServices(new LocalStorageChaveRepository());
      const chaves = await _chavesGnCobrancaServices.execute();
      if (chaves instanceof ProcessInfo) {
        throw new Error('Não foi possível obter chave para emissão da cobrança');
      }

      // const listWebook = new GerencianetListWebhook();
      // const result = await listWebook.execute(new Date('2021-01-22T16:01:35Z'), new Date('2023-11-30T20:10:00Z'));
      // console.log(result);

      const respose = await this.gerencianetConfigWebhook.execute(chaves.chave, new URL(rawUrl));
    } catch (error: any) {
      console.log(error);
      //throw new Error(error.message);
    }
  }
}
