import ContainerDependency, { eContext, FindDepedecy } from '../dependency/container.dependency';

import FirebaseCobrancaPixRepository from '../repository/firebase.cobranca.pix.repository';
import FirebasePagamentoPixRepository from '../repository/firebase.pagamento.pix.repository';
import FirebaseDatabaseOnlineRepository from '../repository/firebase.database.online.repository';

import LocalSqlServerCobrancaDigitalPagamentoRepository from '../repository/local.sql.server.cobranca.digital.pagamento.repository';
import LocalSqlServerCobrancaDigitalPixRepository from '../repository/local.sql.server.cobranca.digital.pix.repository';
import LocalSqlServerCobrancaDigitalTituloRepository from '../repository/local.sql.server.cobranca.digital.titulo.repository';
import LocalSqlServerDatabaseOnlineRepository from '../repository/local.sql.server.database.online.repository';
import LocalSybaseCobrancaDigitalPagamentoRepository from '../repository/local.sybase.cobranca.digital.pagamento.repository';
import LocalSybaseCobrancaDigitalPixRepository from '../repository/local.sybase.cobranca.digital.pix.repository';
import LocalSybaseCobrancaDigitalTituloRepository from '../repository/local.sybase.cobranca.digital.titulo.repository';
import LocalSybaseDatabaseOnlineRepository from '../repository/local.sybase.database.online.repository';

export default class AppDependencys {
  constructor() {}

  public static load() {
    ContainerDependency.instance.register({
      context: eContext.fireBase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new FirebaseDatabaseOnlineRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new LocalSqlServerDatabaseOnlineRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new LocalSybaseDatabaseOnlineRepository(),
    });

    //
    ContainerDependency.instance.register({
      context: eContext.fireBase,
      bind: 'ContractBaseRepository<CobrancaPix>',
      instance: new FirebaseCobrancaPixRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.fireBase,
      bind: 'ContractBaseRepository<PagamentoPix>',
      instance: new FirebasePagamentoPixRepository(),
    });

    //
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

    //
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

    //
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
  }

  public static resolve<T>(params: FindDepedecy): T {
    return ContainerDependency.instance.resolve<T>(params);
  }

  public static clear() {
    ContainerDependency.instance.clear();
  }
}
