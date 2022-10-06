import { eContext } from '../../../src/dependency/container.dependency';

import App from '../../../src/aplication/app';
import AppDependencys from '../../../src/aplication/app.dependencys';
import DataBaseActiveContract from '../../../src/contracts/data.base.active.contract';
import DatabaseOnlineDto from '../../../src/dto/database.online.dto';

describe('DEPENDENCY ()', () => {
  it('deve verificar dependencias', async () => {
    const app = new App();

    const dep = AppDependencys.resolve<DataBaseActiveContract<DatabaseOnlineDto>>({
      context: eContext.fireBase,
      bind: 'DataBaseActiveContract<DatabaseOnlineDto>',
    });

    const result = await dep.getDataBaseInfo();
    console.log(result);
  });
});

export default {};
