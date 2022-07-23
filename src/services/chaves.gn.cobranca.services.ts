import { v4 as uuidv4, v4 } from 'uuid';

import GerencianetListTokenAdapter from '../adapter/gerencianet.list.token.adapter';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import TokenCobrancaContract from '../contracts/token.cobranca.contract';
import { ResponseChaveDto } from '../dto/response.chave.dto';
import ProcessInfo from '../entities/process.info';
import ChaveDto from '../dto/chave.dto';
import Chave from '../entities/chave';

export default class ChavesGnCobrancaServices implements TokenCobrancaContract {
  constructor(private repositorio: LocalBaseRepositoryContract<ChaveDto>) {}
  async execute(): Promise<Chave | ProcessInfo> {
    try {
      const gerencianetListToken = new GerencianetListTokenAdapter();
      const _localChaves = await this.repositorio.select();

      //retorna com as chaves localmente armazenadas
      if (_localChaves && _localChaves.length > 0) {
        const _chave = _localChaves[0];
        return new Chave(_chave.uuid, _chave.status, _chave.dataCriacao, _chave.chave);
      }

      //recupera chave da gerencianet
      if (!_localChaves || _localChaves.length === 0) {
        const response = await gerencianetListToken.execute();
        const newChaves = response.map((item: ResponseChaveDto) => {
          return new Chave(uuidv4(), 'A', new Date(), item.chave);
        });

        //insert response in local storage
        response.forEach((item: ResponseChaveDto) => {
          this.repositorio.insert(new ChaveDto(uuidv4(), item.status, item.dataCriacao, item.chave));
        });

        if (newChaves.length > 0) return newChaves[0];
      }

      return new ProcessInfo('Não foi possível obter chave para emissão da cobrança');
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
