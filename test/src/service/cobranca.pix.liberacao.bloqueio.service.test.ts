import dotenv from 'dotenv';

import { eContext } from '../../../src/dependency/container.dependency';
import AppDependencys from '../../../src/aplication/app.dependencys';
import CobrancaDigitalDto from '../../../src/dto/cobranca.digital.dto';
import CobrancaDigitalTituloDto from '../../../src/dto/cobranca.digital.titulo.dto';
import ItemLiberacaoBloqueioDto from '../../../src/dto/item.liberacao.bloqueio.dto';
import LocalBaseRepositoryContract from '../../../src/contracts/local.base.repository.contract';
import CobrancaPixLiberacaoBloqueioService from '../../../src/services/cobranca.pix.liberacao.bloqueio.service';
import AppFirebase from '../../../src/aplication/app.firebase';

describe('CobrancaPixLiberacaoBloqueioService', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  const localRepoCobrancaDigital = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<CobrancaDigitalDto>',
  });

  const localRepoCobrancaDigitalTitulo = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalTituloDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<CobrancaDigitalTituloDto>',
  });

  const localRepoItemLiberacaoBloqueio = AppDependencys.resolve<LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<ItemLiberacaoBloqueioDto>',
  });

  describe('liberar bloqueio', () => {
    it('', async () => {
      expect(true).toBeTruthy();
    });
  });
});
