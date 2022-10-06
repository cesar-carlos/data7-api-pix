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
          const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
          const info = new ProcessInfo(
            infoStatusErro,
            `Nao foi possivel obter informacoes da base de dados. ${databaseOnline}`,
            `Nao foi possivel obter informacoes da base de dados. ${databaseOnline}`,
          );

          return info;
        }
      }

      const infoStatusErro: ProcessInfoStatusType = { status: 'success' };
      const info = new ProcessInfo(infoStatusErro, 'Base de dados online.');
      return info;
    } catch (error: any) {
      const infoStatusErro: ProcessInfoStatusType = { status: 'error' };
      return new ProcessInfo(infoStatusErro, 'CreateGnQrcodeService', error.message);
    }
  }
}
