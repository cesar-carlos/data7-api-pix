import GerencianetCobranca from '../services/gerencianet.cobranca';
import FakeRepository from '../repository/fake.cobranca.repository';
import ContractCredentialPIX from '../contracts/contract.credential.pix';

//todo: create test jest
export default class CobrancaPIX {
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

  async exec() {
    const cnpj = '00000000000000';
    const docId: string = this.docsIdFake[0];
    const config: ContractCredentialPIX = require('../assets/config.pix.ts');

    const fakeCobranca = await this.fakeRepository.getById(cnpj, docId);

    if (fakeCobranca && config) {
      const gerencianetCobranca = new GerencianetCobranca(config, fakeCobranca);

      //test methods
      //gerencianetCobranca.getChave();
      //gerencianetCobranca.createCobrancaPIX();
      //gerencianetCobranca.listKeys();
    }
  }
}
