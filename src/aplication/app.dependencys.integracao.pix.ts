import { eContext } from '../dependency/container.dependency';

import ContainerDependency from '../dependency/container.dependency';
import SicrediCreatePixAdapter from '../adapter/sicredi.create.pix.adapter';
import GerencianetCreatePixAdapter from '../adapter/gerencianet.create.pix.adapter';
import FirebaseCobrancaPixRepository from '../repository/firebase/firebase.cobranca.pix.repository';
import FirebasePagamentoPixRepository from '../repository/firebase/firebase.pagamento.pix.repository';
import FirebaseDatabaseOnlineRepository from '../repository/firebase/firebase.database.online.repository';
import LocalSqlServerCobrancaDigitalPagamentoRepository from '../repository/integracao/local.sql.server.cobranca.digital.pagamento.repository';
import LocalSqlServerCobrancaDigitalPixRepository from '../repository/integracao/local.sql.server.cobranca.digital.pix.repository';
import LocalSqlServerCobrancaDigitalRepository from '../repository/integracao/local.sql.server.cobranca.digital.repository';
import LocalSqlServerCobrancaDigitalTituloRepository from '../repository/integracao/local.sql.server.cobranca.digital.titulo.repository';
import LocalSybaseCobrancaDigitalPagamentoRepository from '../repository/integracao/local.sybase.cobranca.digital.pagamento.repository';
import LocalSybaseCobrancaDigitalTituloRepository from '../repository/integracao/local.sybase.cobranca.digital.titulo.repository';
import LocalSybaseCobrancaDigitalPixRepository from '../repository/integracao/local.sybase.cobranca.digital.pix.repository';
import LocalSybaseCobrancaDigitalRepository from '../repository/integracao/local.sybase.cobranca.digital.repository';

export default class AppDependencysIntegracaoPix {
  public static load() {
    ContainerDependency.instance.register({
      context: eContext.firebase,
      bind: 'ContractBaseRepository<CobrancaPix>',
      instance: new FirebaseCobrancaPixRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
      instance: new LocalSqlServerCobrancaDigitalPixRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
      instance: new LocalSybaseCobrancaDigitalPixRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
      instance: new LocalSqlServerCobrancaDigitalTituloRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
      instance: new LocalSybaseCobrancaDigitalTituloRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>',
      instance: new LocalSqlServerCobrancaDigitalPagamentoRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalPagamentoDto>',
      instance: new LocalSybaseCobrancaDigitalPagamentoRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
      instance: new LocalSqlServerCobrancaDigitalRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
      instance: new LocalSybaseCobrancaDigitalRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.firebase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new FirebaseDatabaseOnlineRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.firebase,
      bind: 'ContractBaseRepository<PagamentoPix>',
      instance: new FirebasePagamentoPixRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.gerencianet,
      bind: 'CreatePixApiContract',
      instance: new GerencianetCreatePixAdapter(),
    });

    ContainerDependency.instance.register({
      context: eContext.sicredi,
      bind: 'CreatePixApiContract',
      instance: new SicrediCreatePixAdapter(),
    });
  }
}
