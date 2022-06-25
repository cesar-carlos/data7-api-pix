import FirebaseCobrancaRepository from './repository/firebase.cobranca.repository';
import FakeRepository from './repository/fake.cobranca.repository';
import Cobranca from './model/cobranca';
import WatchPatch from './watch.patch';

//run tests api/cobranca
const firebaseRepository = new FirebaseCobrancaRepository();
const fakeRepository = new FakeRepository();

const _patch = '/Users/cesar-carlos/temp';
const _cnpj = '27740308000120';
const _data = '2022-6-24';
const _documento = '3831849.11.27740308000120.20220622181050-OB.21.001';

//teste de busca de cobrancas por filial
// firebaseRepository.getAll(_cnpj).then((cobrancas) => {
//   console.log(cobrancas);
// });

//teste de busca de cobrancas por id
// firebaseRepository.getByIdDate(_cnpj, _data, _documento).then((cobranca) => {
//   console.log(cobranca);
// });

const watchPatch = new WatchPatch(_patch);
watchPatch.watch();
