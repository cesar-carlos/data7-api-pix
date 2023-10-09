import dotenv from 'dotenv';
import { eContext } from '../../../src/dependency/container.dependency';

import PagamentoPix from '../../../src/entities/pagamento.pix';
import CobrancaDigitalPixDto from '../../../src/dto/cobranca.digital.pix.dto';
import CobrancaPixConsultaPagamentoService from '../../../src/services/cobranca.pix.consulta.pagamento.service';
import ContractBaseRepository from '../../../src/contracts/base.repository.contract';
import AppDependencys from '../../../src/aplication/app.dependencys';
import LocalBaseRepositoryContract from '../../../src/contracts/local.base.repository.contract';
import AppFirebase from '../../../src/aplication/app.firebase';

describe('CobrancaPixConsultaPagamentoService', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  const localDataPagamentoPix = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalPixDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
  });

  const onlineDataPagamentoPix = AppDependencys.resolve<ContractBaseRepository<PagamentoPix>>({
    context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'ContractBaseRepository<PagamentoPix>',
  });

  describe('Confirma pagamento pix', () => {
    it('should return an array of PagamentoPix when a valid txId is provided', async () => {
      const cobrancaPixConsultaPagamentoService = new CobrancaPixConsultaPagamentoService(
        localDataPagamentoPix,
        onlineDataPagamentoPix,
      );

      const result = await cobrancaPixConsultaPagamentoService.execute('chave?', 'OB', 20371);
      console.log(result);
      expect(result).toBeDefined();
    });
  });
});
