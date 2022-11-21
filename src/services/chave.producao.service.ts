import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';

import Chave from '../entities/chave';
import ChaveDto from '../dto/chave.dto';
import ChaveService from './chave.service';
import WebhookGnRegisterService from './webhook.gn.register.service';

import { ChaveStatusType } from '../type/chave.status.type';

export default class ChaveProducaoService {
  constructor(readonly localRepository: LocalBaseRepositoryContract<ChaveDto>) {}

  public async execute(): Promise<ChaveDto> {
    try {
      const url = process.env.WEBHOOK_GN_URL2;
      const chaveService = new ChaveService(this.localRepository);
      const chavesDto = await chaveService.execute();

      if (!url) throw new Error('WEBHOOK_GN_URL is not defined');
      if (!chavesDto || chavesDto.length === 0) throw new Error('chave is not defined');

      const chaveStatus: ChaveStatusType = { status: 'producao' };
      const chaveProducao = chavesDto.find((item: ChaveDto) => item.status === chaveStatus.status);
      if (chaveProducao) return chaveProducao;

      //registra nova chave
      const webhookGnRegisterService = new WebhookGnRegisterService();
      const chaveDto = chavesDto[0];
      const chave = new Chave(
        chaveDto.codEmpresa,
        chaveDto.codFilial,
        chaveDto.codCobrancaDigital,
        chaveDto.uuid,
        chaveDto.status,
        chaveDto.dataCriacao,
        chaveDto.chave,
      );

      const processInfo = await webhookGnRegisterService.execute(chave.chave, new URL(url));
      if (processInfo.process.status === 'success') {
        const newChaveDto = new ChaveDto(
          chave.codEmpresa,
          chave.codFilial,
          chave.codCobrancaDigital,
          chave.uuid,
          chaveStatus.status,
          chave.dataCriacao,
          chave.chave,
        );

        await this.localRepository.update(newChaveDto);
        return chaveDto;
      }

      throw new Error(processInfo.info);
    } catch (error: any) {
      throw new Error(error.mensagem);
    }
  }
}
