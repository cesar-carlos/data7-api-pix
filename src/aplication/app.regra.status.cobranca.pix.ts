import { eContext } from '../dependency/container.dependency';

import CobrancaPix from '../entities/cobranca.pix';
import AppDependencys from './app.dependencys';
import CobrancaDigitalDto from '../dto/cobranca.digital.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import ItemLiberacaoBloqueioDto from '../dto/item.liberacao.bloqueio.dto';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import RegraStatusCobrancaPixService from '../services/regra.status.cobranca.pix.service';

export default class AppRegraStatusCobrancaPix {
  private localRepositoryLiberacao = AppDependencys.resolve<LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
  });

  private localRepositoryCobranca = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
  });

  private onlineRepository = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
    context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'ContractBaseRepository<CobrancaPix>',
  });

  private regraStatusCobrancaService = new RegraStatusCobrancaPixService(
    this.localRepositoryLiberacao,
    this.localRepositoryCobranca,
    this.onlineRepository,
  );

  public async execute(params: { codLiberacaoBloqueio: number; idLiberacao: number }): Promise<void> {
    await this.regraStatusCobrancaService.execute(params.codLiberacaoBloqueio, params.idLiberacao);
  }
}
