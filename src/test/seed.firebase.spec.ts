import FakeRepository from '../repository/fake.cobranca.repository';
import FirebaseCobrancaRepository from '../repository/firebase.cobranca.repository';

//todo: create test jest
export default class SeedFirabase {
  private firebaseRepository = new FirebaseCobrancaRepository();
  private fakeRepository = new FakeRepository();

  private docsIdFake = [
    '3831849.11.27740308000120.20220622181050-OB.21.001',
    '3831849.11.27740308000120.20220622181050-OB.21.002',
    '3831849.11.27740308000120.20220622181050-OB.21.003',
  ];

  constructor() {
    this.initialize();
  }

  private async initialize() {}

  public async exec() {
    const cnpj = '00000000000000';
    const fakeCobrancas = await this.fakeRepository.getAll(cnpj);

    //fill firebase inicialy seed
    if (fakeCobrancas) {
      fakeCobrancas.forEach((fakeCobranca) => {
        this.firebaseRepository.create(fakeCobranca);
      });
    }
  }
}
