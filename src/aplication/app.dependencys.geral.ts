import { eContext } from '../dependency/container.dependency';

import ContainerDependency from '../dependency/container.dependency';
import LocalSqlServerDatabaseOnlineRepository from '../repository/common.data/local.sql.server.database.online.repository';
import LocalSqlServerItemLiberacaoBloqueioRepository from '../repository/common.data/local.sql.server.item.liberacao.bloqueio.repository';
import LocalSybaseItemLiberacaoBloqueioRepository from '../repository/common.data/local.sybase.item.liberacao.bloqueio.repository';
import LocalSybaseDatabaseOnlineRepository from '../repository/common.data/local.sybase.database.online.repository';
import LocalSqlServerSequences from '../repository/common.data/local.sql.server.sequences';

export default class AppDependencysGeral {
  public static load() {
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

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
      instance: new LocalSqlServerItemLiberacaoBloqueioRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sybase,
      bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
      instance: new LocalSybaseItemLiberacaoBloqueioRepository(),
    });

    ContainerDependency.instance.register({
      context: eContext.sql_server,
      bind: 'LocalBaseRepositorySequenceContract<SequenceDto>',
      instance: new LocalSqlServerSequences(),
    });
  }
}
