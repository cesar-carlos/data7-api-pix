import FirebaseCobrancaRepository from './repository/firebase.cobranca.repository';
import FakeRepository from './repository/fake.repository';

const repository = new FirebaseCobrancaRepository();
const fakeRepository = new FakeRepository();

// repository.postTest()
//repository.getTest()
