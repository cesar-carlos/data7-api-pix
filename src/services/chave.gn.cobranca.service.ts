import { v4 as uuidv4 } from 'uuid';

import GerencianetListChaveAdapter from '../adapter/gerencianet.list.chave.adapter';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import TokenCobrancaContract from '../contracts/token.cobranca.contract';
import ProcessInfo from '../entities/process.info';
import ChaveDto from '../dto/chave.dto';
import Chave from '../entities/chave';

import { ChaveStatusType } from '../type/chave.status.type';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class ChaveGnCobrancaService implements TokenCobrancaContract {
  constructor(private repositorio: LocalBaseRepositoryContract<ChaveDto>) {}
  async execute(): Promise<Chave | ProcessInfo> {
    try {
      let _local = (await this.repositorio.select()) ?? [];
      const _gerencianetListChaves = new GerencianetListChaveAdapter();
      const chave = _local.find((item: ChaveDto) => item.status.toLowerCase() === 'producao');

      //retorna chave em cache produção
      if (chave) {
        return new Chave(chave.uuid, chave.status, chave.dataCriacao, chave.chave);
      }

      //atualiza cache produção
      if (_local.length === 0) {
        const chaveStatusType: ChaveStatusType = { status: 'producao' };
        const response = await _gerencianetListChaves.execute();
        for (const key in response) {
          const uuid = uuidv4();
          const item = response[key];

          if (key === '0') {
            const chaveDtoProducao = new ChaveDto(uuid, chaveStatusType.status, item.dataCriacao, item.chave);
            _local.push(chaveDtoProducao);
          } else {
            const chaveDto = new ChaveDto(uuid, item.status, item.dataCriacao, item.chave);
            _local.push(chaveDto);
          }
        }

        _local.forEach((item: ChaveDto) => {
          this.repositorio.insert(item);
        });

        if (_local.length > 0) {
          return new Chave(_local[0].uuid, _local[0].status, _local[0].dataCriacao, _local[0].chave);
        } else {
          const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
          return new ProcessInfo(
            infoStatusErro,
            'ChavesGnCobrancaServices',
            'Não foi possível obter a chave de cobrança',
          );
        }
      }

      //default return
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'ChavesGnCobrancaServices', 'Erro interno');
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
    }
  }
}
