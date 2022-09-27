import ContainerDependency, { eContext, FindDepedecy } from '../dependency/container.dependency';

import FirebaseDatabaseOnlineRepository from '../repository/firebase.database.online.repository';
import LocalSqlServerDatabaseOnlineRepository from '../repository/local.sql.server.database.online.repository';
import LocalSybaseDatabaseOnlineRepository from '../repository/local.sybase.database.online.repository';

export default class ManagementDependencys {
  constructor() {}

  public static load() {
    ContainerDependency.instance.register({
      context: eContext.fireBase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new FirebaseDatabaseOnlineRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new LocalSybaseDatabaseOnlineRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
      instance: new LocalSqlServerDatabaseOnlineRepository(),
    });
  }

  public static resolve<T>(params: FindDepedecy): T {
    return ContainerDependency.instance.resolve<T>(params);
  }

  public static clear() {
    ContainerDependency.instance.clear();
  }
}
