import { eContext } from '../dependency/container.dependency';

import ProcessInfo from '../entities/process.info';
import DatabaseOnlineDto from '../dto/common.data/database.online.dto';
import DataBaseActiveContract from '../contracts/data.base.active.contract';
import DatabaseStatusService from '../services/database.status.service';
import AppDependencys from './app.dependencys';

export default class AppTestDatabeses {
  private localRepo = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
  });

  private onlineRepo = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
    context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
  });

  public async execute(): Promise<ProcessInfo> {
    const databaseStatusService = new DatabaseStatusService([this.localRepo, this.onlineRepo]);
    const info = await databaseStatusService.execute();
    return info;
  }
}
