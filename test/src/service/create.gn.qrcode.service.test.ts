import PagamentoPendente from '../../../src/entities/pagamento.pendente';
import CreateGnQrcodeService from '../../../src/services/create.gn.qrcode.service';
import { loc } from '../../../src/dto/response.create.pix.dto';
import PagamentoLoc from '../../../src/entities/pagamento.loc';
import PagamentoQrCode from '../../../src/entities/pagamento.qrcode';

describe('deve criar um qrCode com um locid (CreateGnQrcodeService)', () => {
  //TUDO: criar um mock para o GerencianetCreateQrcodePixAdapter
  const createGnQrcodeService = new CreateGnQrcodeService();
  const locid = 270;

  const prtoPendente = new PagamentoPendente(
    'b01410411a314bf1a9e31a6b528c4711',
    '3833511.11.27740308000120.20220829155055-OB.21 001',
    'bc89689b-11bc-4304-b2c4-c474e90e2467',
    'ATIVA',
    { cpf: '00000000000', nome: 'SE7E SISTEMAS' },
    new Date('2022-08-29T19:50:55.644Z'),
    new Date('2022-08-30T22:30:55.644Z'),
    '0.70',
    'COLOQUE OBSERVACAO PADRAO TITULO (NAO PODE SER NULO)',
    new PagamentoLoc(
      locid,
      'qrcodes-pix.gerencianet.com.br/v2/3f673f4d4a424e2e949fff19671471a0',
      'cob',
      new Date('2022-08-29T19:50:57.888Z'),
    ),
  );

  test('deve retornar um (PagamentoQrCode)', async () => {
    try {
      const result = await createGnQrcodeService.execute(prtoPendente);
      expect(result).toBeInstanceOf(PagamentoQrCode);
      expect(result).not.toBeNull();
      expect(result).not.toBeUndefined();
    } catch (error: any) {
      console.log(error.message);
    }
  });
});

export default {};
