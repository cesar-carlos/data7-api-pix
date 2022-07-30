import Chave from '../../../src/entities/chave';
import LocalStorageChaveRepository from '../../../src/repository/local.storage.chave.repository';
import ChavesGnCobrancaServices from '../../../src/services/chave.gn.cobranca.service';

test(`deve retornar uma instacia de Chave`, async () => {
  const _localStorageChaveRepository = new LocalStorageChaveRepository();
  const _chavesGnCobrancaServices = new ChavesGnCobrancaServices(_localStorageChaveRepository);
  const result = await _chavesGnCobrancaServices.execute();
  expect(result).toBeInstanceOf(Chave);
});

export {};
