import { eContext } from '../dependency/container.dependency';

import CobrancaPix from '../entities/cobranca.pix';
import PagamentoPix from '../entities/pagamento.pix';

import AppDependencys from './app.dependencys';
import ContractBaseRepository from '../contracts/base.repository.contract';
import LocalBaseRepositoryContract from '../contracts/local.base.repository.contract';
import CobrancaDigitalPagamentoDto from '../dto/cobranca.digital.pagamento.dto';
import CobrancaDigitalTituloDto from '../dto/cobranca.digital.titulo.dto';
import CobrancaPixListenService from '../services/cobranca.pix.listen.service';
import CobrancaPixListenRefleshService from '../services/cobranca.pix.listen.reflesh.service';

export default class AppLinstens {
  execute() {
    this.listenCobrancaPix();
    this.listenRefleshCobrancaPix();
  }

  private async listenCobrancaPix() {
    const locaDataBase = process.env.DATABASE || '';
    const firebaseCobrancaPixRepository = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
      context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'ContractBaseRepository<CobrancaPix>',
    });

    const firebasePagamentoPixRepository = AppDependencys.resolve<ContractBaseRepository<PagamentoPix>>({
      context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'ContractBaseRepository<PagamentoPix>',
    });

    const localCobrancaDigitalTituloRepository = AppDependencys.resolve<
      LocalBaseRepositoryContract<CobrancaDigitalTituloDto>
    >({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
    });

    const localCobrancaDigitalPagamentoRepository = AppDependencys.resolve<
      LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>
    >({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>',
    });

    new CobrancaPixListenService(
      firebaseCobrancaPixRepository,
      firebasePagamentoPixRepository,
      localCobrancaDigitalTituloRepository,
      localCobrancaDigitalPagamentoRepository,
    ).listen();
  }

  private listenRefleshCobrancaPix() {
    new CobrancaPixListenRefleshService().listen();
  }
}
