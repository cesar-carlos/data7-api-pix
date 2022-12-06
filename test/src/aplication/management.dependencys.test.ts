import dotenv from 'dotenv';

import { eContext } from '../../../src/dependency/container.dependency';

import AppFirebase from '../../../src/aplication/app.firebase';
import AppDependencys from '../../../src/aplication/app.dependencys';
import DatabaseOnlineDto from '../../../src/dto/database.online.dto';
import DataBaseActiveContract from '../../../src/contracts/data.base.active.contract';

describe('DEPENDENCY', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  it('deve verificar dependencias base de dados online', async () => {
    const onLineData = process.env.ONLINE_DATABASE || '';
    const dep = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
      context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
    });

    const databaseOnlineDto = (await dep.getDataBaseInfo()) as DatabaseOnlineDto;
    expect(databaseOnlineDto.base.toLocaleLowerCase()).toBe(onLineData.toLocaleLowerCase());
  });

  it('deve verificar dependencias base de dados local', async () => {
    const localData = process.env.LOCAL_DATABASE || '';
    const dep = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
      context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
    });

    const databaseOnlineDto = (await dep.getDataBaseInfo()) as DatabaseOnlineDto;
    expect(databaseOnlineDto.base.toLocaleLowerCase()).toBe(localData.toLocaleLowerCase());
  });
});

export default {};
