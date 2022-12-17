import dotenv from 'dotenv';

import { STATUS } from '../../../src/type/status';
import { eContext } from '../../../src/dependency/container.dependency';
import { cobrancaMock } from '../../../mocks/cobranca.mock';

import GerencianetCreatePixAdapter from '../../../src/adapter/gerencianet.create.pix.adapter';
import SicrediCreatePixAdapter from '../../../src/adapter/sicredi.create.pix.adapter';

import CobrancaPix from '../../../src/entities/cobranca.pix';
import ProcessInfo from '../../../src/entities/process.info';
import AppFirebase from '../../../src/aplication/app.firebase';
import AppDependencys from '../../../src/aplication/app.dependencys';
import CreatePixService from '../../../src/services/create.pix.service';
import CobrancaPixService from '../../../src/services/cobranca.pix.service';
import CobrancaDigitalPixDto from '../../../src/dto/cobranca.digital.pix.dto';
import ContractBaseRepository from '../../../src/contracts/base.repository.contract';
import LocalBaseRepositoryContract from '../../../src/contracts/local.base.repository.contract';

describe('processo de criar cobrança', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  const jestTimeOut = 10000;
  const createPixAdapter =
    process.env.API_PIX === 'GERENCIANET' ? new GerencianetCreatePixAdapter() : new SicrediCreatePixAdapter();

  const createPixService = new CreatePixService(createPixAdapter);

  const localData = AppDependencys.resolve<LocalBaseRepositoryContract<CobrancaDigitalPixDto>>({
    context: process.env.LOCAL_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'LocalBaseRepositoryContract<CobrancaDigitalPixDto>',
  });

  const onlineData = AppDependencys.resolve<ContractBaseRepository<CobrancaPix>>({
    context: process.env.ONLINE_DATABASE?.toLocaleLowerCase() as eContext,
    bind: 'ContractBaseRepository<CobrancaPix>',
  });

  const cobrancaPixService = new CobrancaPixService(localData, onlineData, createPixService);

  beforeAll(async () => {});

  afterAll(async () => {
    for (let i = 0; i < cobrancaMock.parcelas.length; i++) {
      const parcela = cobrancaMock.parcelas[i];
      const item = new CobrancaDigitalPixDto({
        sysId: parcela.sysId,
        sequencia: i + 1,
        txId: '',
        dataCriacao: new Date(),
        dataExpiracao: new Date(),
        qrCode: '',
        imagemQrcode: '',
        valor: 0.06,
      });

      await localData.delete(item);
      await onlineData.delete(parcela.sysId);
    }
  });

  test(
    'deve criar uma cobrança pix',
    async () => {
      const response = await cobrancaPixService.execute(cobrancaMock);
      const localrepo = await localData.selectWhere([{ key: 'SysId', value: cobrancaMock.parcelas[0].sysId }]);
      const onlinerepo = await onlineData.find(cobrancaMock.parcelas[0].sysId);

      expect(response).toBeInstanceOf(ProcessInfo);
      expect(onlinerepo).toBeInstanceOf(CobrancaPix);
      expect(response.process.status).toBe('success');
      expect(localrepo?.length).toBe(1);
      expect(onlinerepo?.STATUS).toBe(STATUS.AGUARDANDO);
    },

    jestTimeOut,
  );
});

export default {};
