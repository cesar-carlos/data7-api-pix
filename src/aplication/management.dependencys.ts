import ContainerDependency, { eContext } from '../dependency/container.dependency';

import LocalSybaseCobrancaDigitalConfigRepository from '../repository/local.sybase.cobranca.digital.config.repository';
import LocalSqlServerCobrancaDigitalConfigRepository from '../repository/local.sql.server.cobranca.digital.config.repository';

export default class ManagementDependencys {
  constructor() {}

  public static load() {
    ContainerDependency.instance.register(eContext.sql_server, new LocalSqlServerCobrancaDigitalConfigRepository());
    ContainerDependency.instance.register(eContext.sybase, new LocalSybaseCobrancaDigitalConfigRepository());
  }

  public static resolve<T>(context: eContext, type: T): T {
    return ContainerDependency.instance.resolve<T>(context, type);
  }

  public static clear() {
    ContainerDependency.instance.clear();
  }
}
