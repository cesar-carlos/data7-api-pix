import dotenv from 'dotenv';

import ProcessInfo from '../../../src/entities/process.info';
import AppFirebase from '../../../src/aplication/app.firebase';
import AppDependencys from '../../../src/aplication/app.dependencys';
import AppCobrancaPix from '../../../src/aplication/app.cobranca.pix';

import { requestCobrancaDTO } from '../../../src/dto/request.cobranca.dto';
import { requestCobrancaDtoMock } from '../../../mocks/request.cobranca.dto.mock';

describe('criar cobrança', () => {
  dotenv.config();
  AppFirebase.load();
  AppDependencys.load();

  const appCobrancaPix = new AppCobrancaPix();

  it('deve criar um pix ', async () => {
    const mock = requestCobrancaDtoMock;
    const requestCobrancas: requestCobrancaDTO[] = [mock];

    const result = await appCobrancaPix.execute(requestCobrancas);
    expect(result).toBeInstanceOf(ProcessInfo);
    expect(result.process.status).toBe('success');
  });
});

export default {};
