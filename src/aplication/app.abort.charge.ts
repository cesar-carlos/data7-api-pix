import { eContext } from '../dependency/container.dependency';

import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';
import ContractBaseRepository from '../contracts/base.repository.contract';
import CancelamentoPixService from '../services/cancelamento.pix.service';
import AppDependencys from './app.dependencys';
import CobrancaPix from '../entities/cobranca.pix';

export default class AppAbortCharge {
  private sysId: string;
  private provedor: string;
  private requerente: string; //'CS: CANCELADO-SISTEMA' | CC: 'CANCELADO-CLIENTE' | PG:'PAGAMENTO-CLIENTE'

  constructor(params: { sysId: string; provedor: string; requerente: string }) {
    this.sysId = params.sysId;
    this.provedor = params.provedor;
    this.requerente = params.requerente;
  }

  public async execute() {
    const localRepository = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalTituloDto>>({
      context: (this.provedor as string).toLocaleLowerCase() === 'sybase' ? eContext.sybase : eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
    });

    const onlineRepository = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
      context: eContext.fireBase,
      bind: 'ContractBaseRepository<CobrancaPix>',
    });

    const cancelamentoPixService = new CancelamentoPixService(localRepository, onlineRepository);
    cancelamentoPixService.execute({ sysId: this.sysId, status: 'CS' });
  }
}
