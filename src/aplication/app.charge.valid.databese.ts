import { eContext } from '../dependency/container.dependency';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

import ResponseInfoDto from '../dto/response.info.dto';
import DatabaseOnlineDto from '../dto/database.online.dto';
import DatabaseStatusService from '../services/database.status.service';
import DataBaseActiveContract from '../contracts/data.base.active.contract';

import AppDependencys from './app.dependencys';

export default class AppChargeValidDatabese {
  private provedor: string = (process.env.DATABASE || '').trim();

  public async execute(): Promise<ResponseInfoDto> {
    const infoStatusErro: ProcessInfoStatusType = { status: 'error' };

    const ActiveLocalRepo = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
      context: this.provedor.toLocaleLowerCase().trim() === 'sybase' ? eContext.sybase : eContext.sql_server,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
    });

    const ActiveOnlineRepo = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
      context: eContext.fireBase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
    });

    const databaseStatusService = new DatabaseStatusService([ActiveLocalRepo, ActiveOnlineRepo]);
    const processInfoDataBase = await databaseStatusService.execute();

    if (processInfoDataBase.process.status === infoStatusErro.status) {
      const responseInfoDto = new ResponseInfoDto({
        info: 'INFO-REQUEST',
        message: processInfoDataBase.info ?? '',
        statusCode: 400,
      });

      return responseInfoDto;
    }

    return new ResponseInfoDto({
      info: 'INFO-REQUEST',
      message: 'DATABASE ONLINE',
      statusCode: 200,
    });
  }
}
