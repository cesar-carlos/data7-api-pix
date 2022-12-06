import { ProcessInfoStatusType } from '../type/process.info.status.type';

import DataBaseActiveContract from '../contracts/data.base.active.contract';
import DatabaseOnlineDto from '../dto/database.online.dto';
import ProcessInfo from '../entities/process.info';

export default class DatabaseStatusService {
  constructor(readonly repositorys: DataBaseActiveContract<DatabaseOnlineDto>[]) {}

  public async execute(): Promise<ProcessInfo> {
    try {
      for (const repository of this.repositorys) {
        const databaseOnline = await repository.getDataBaseInfo();

        if (typeof databaseOnline === 'string') {
          const info = new ProcessInfo(
            { status: 'error' },
            `(database status service). Nao foi possivel obter informacoes da base de dados. ${databaseOnline}`,
            `${databaseOnline}`,
          );

          return info;
        }
      }

      const info = new ProcessInfo({ status: 'success' }, 'Base de dados online.');
      return info;
    } catch (error: any) {
      return new ProcessInfo({ status: 'error' }, 'CreateGnQrcodeService', error.message);
    }
  }
}
