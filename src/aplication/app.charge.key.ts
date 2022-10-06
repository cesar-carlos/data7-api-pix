import ChaveDto from '../dto/chave.dto';
import ResponseInfoDto from '../dto/response.info.dto';
import ChaveProducaoService from '../services/chave.producao.service';
import LocalStorageChaveRepository from '../repository/local.storage.chave.repository';

export default class AppChargeKey {
  static async get(): Promise<ResponseInfoDto | ChaveDto> {
    const repository = new LocalStorageChaveRepository();
    const chave = await new ChaveProducaoService(repository).execute();
    if (!chave) return new ResponseInfoDto({ info: 'INFO-REQUEST', message: 'chave not found', statusCode: 400 });
    return chave;
  }
}
