import GerencianetCobranca from '../services/gerencianet.cobranca';
import FakeRepository from '../repository/fake.cobranca.repository';
import ContractCredentialPIX from '../contracts/contract.credential.pix';
import PagamentoLoc from '../model/pagamento.loc';

//todo: create test jest
export default class CobrancaPIXTest {
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
      const gerencianetCobranca = new GerencianetCobranca(config);

      //test methods
      // const chave = await gerencianetCobranca.getChave();
      // console.log(chave);

      // const chaves = await gerencianetCobranca.listChave();
      // console.log(chaves);

      // const pagamento = await gerencianetCobranca.createCobrancaPIX(fakeCobranca);
      // console.log(pagamento);

      // const qrCode = await gerencianetCobranca.createQrCodePIX(13);
      // console.log(qrCode);

      // const dataInicia = new Date('2022-06-01T20:24:24.846Z');
      // const dataFinal = new Date('2022-06-30T20:24:24.846Z');
      // const listPIX = await gerencianetCobranca.listPIX(dataInicia, dataFinal);
      // console.log(listPIX);

      // const dataInicial = new Date('2022-06-01T20:24:24.846Z');
      // const dataFinal = new Date('2022-06-30T20:24:24.846Z');
      // const listLOC = await gerencianetCobranca.listLOC(dataInicial, dataFinal);
      // console.log(listLOC);

      // const txid = '1b413ad569044886bf78eb03151a5e49';
      // const statusPIX = await gerencianetCobranca.statusPIX(txid);
      // console.log(statusPIX);

      // const endToEndId = 'E18236120202206201518s15b18235b9';
      // const pix = await gerencianetCobranca.PIX(endToEndId);
      // console.log(pix);
    }
  }
}
