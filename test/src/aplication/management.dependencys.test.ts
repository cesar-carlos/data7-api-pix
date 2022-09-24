import { eContext } from '../../../src/dependency/container.dependency';

import ManagementDependencys from '../../../src/aplication/management.dependencys';
import LocalBaseRepositoryContract from '../../../src/contracts/local.base.repository.contract';
import CobrancaDigitalConfigDto from '../../../src/dto/cobranca.digital.config.dto';

describe('DEPENDENCY ()', () => {
  it('deve verificar dependencias', async () => {
    ManagementDependencys.load();

    const dep = ManagementDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalConfigDto>>(
      eContext.sql_server,
    );
  });
});

export default {};
