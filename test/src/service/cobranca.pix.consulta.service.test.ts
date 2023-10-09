import dotenv from 'dotenv';
import { eContext } from '../../../src/dependency/container.dependency';

import PagamentoPix from '../../../src/entities/pagamento.pix';
import CobrancaPixConsultaService from '../../../src/services/cobranca.pix.consulta.service';
import ContractBaseRepository from '../../../src/contracts/base.repository.contract';
import AppDependencys from '../../../src/aplication/app.dependencys';
import AppFirebase from '../../../src/aplication/app.firebase';

describe('CobrancaPixConsultaService', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  const onlineDataPagamentoPix = AppDependencys.resolve<ContractBaseRepository<PagamentoPix>>({
    context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'ContractBaseRepository<PagamentoPix>',
  });

  describe('execute', () => {
    it('should return an array of PagamentoPix when a valid txId is provided', async () => {
      const cobrancaPixConsultaService = new CobrancaPixConsultaService(onlineDataPagamentoPix);
      const result = await cobrancaPixConsultaService.execute('9a4d7be994d58487f79d1246345086b5058');
      expect(result).toBeDefined();
    });
  });
});
