import DataBaseActiveContract from '../contracts/data.base.active.contract';
import DatabaseOnlineDto from '../dto/database.online.dto';
import ProcessInfo from '../entities/process.info';
import { ProcessInfoStatusType } from '../type/process.info.status.type';

export default class LocalDatabaseStatusService {
  constructor(readonly repo: DataBaseActiveContract<DatabaseOnlineDto>) {}

  public async execute(): Promise<DatabaseOnlineDto | ProcessInfo> {
    try {
      const databaseOnline = await this.repo.getDataBaseInfo();
      if (databaseOnline === undefined) {
        const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
        return new ProcessInfo(
          infoStatusErro,
          'LocalDatabaseStatusService',
          'não foi possivel obter o status do banco de dados local',
        );
      }

      return databaseOnline;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
    }
  }
}
