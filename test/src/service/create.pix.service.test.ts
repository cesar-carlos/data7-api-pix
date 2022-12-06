import dotenv from 'dotenv';
import GerencianetCreatePixAdapter from '../../../src/adapter/gerencianet.create.pix.adapter';
import SicrediCreatePixAdapter from '../../../src/adapter/sicredi.create.pix.adapter';

import { cobrancaPixInputDTO } from '../../../mocks/cobranca.pix.mock';

import ProcessInfo from '../../../src/entities/process.info';
import CreatePixService from '../../../src/services/create.pix.service';
import PagamentoPendente from '../../../src/entities/pagamento.pendente';

describe('processo de criar cobrança', () => {
  dotenv.config();

  const createPixAdapter =
    process.env.API_PIX === 'GERENCIANET' ? new GerencianetCreatePixAdapter() : new SicrediCreatePixAdapter();

  const createPixService = new CreatePixService(createPixAdapter);

  beforeAll(() => {});

  afterAll(() => {});

  test('deve criar uma cobrança pix', async () => {
    const response = await createPixService.execute(cobrancaPixInputDTO);
    if (response instanceof ProcessInfo) throw new Error(response.result);
    expect(response).toBeInstanceOf(PagamentoPendente);
  });
});

export default {};
