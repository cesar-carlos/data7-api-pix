import { eContext } from '../dependency/container.dependency';

import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import CobrancaDigitalTituloDto from '../dto/integracao/cobranca.digital.titulo.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CancelamentoPixService from '../services/cancelamento.pix.service';
import AppDependencys from './app.dependencys';
import CobrancaPix from '../entities/cobranca.pix';

export default class AppCancelarCobranca {
  private sysId: string;
  private requerente: string; //'CS: CANCELADO-SISTEMA' | CC: 'CANCELADO-CLIENTE' | PG:'PAGAMENTO-CLIENTE'

  constructor(params: { sysId: string; requerente: string }) {
    this.sysId = params.sysId;
    this.requerente = params.requerente;
  }

  public async execute() {
    const localRepository = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalTituloDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
    });

    const onlineRepository = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
      context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'ContractBaseRepository<CobrancaPix>',
    });

    const cancelamentoPixService = new CancelamentoPixService(localRepository, onlineRepository);
    cancelamentoPixService.execute({ sysId: this.sysId, status: this.requerente });
  }
}
