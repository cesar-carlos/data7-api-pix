import CobrancaPix from '../../../src/entities/cobranca.pix';
import { STATUS } from '../../../src/type/status';

describe('?', () => {
  test('deve inicializar (CobrancaPix)', async () => {
    const cobrancaPix = new CobrancaPix({
      sysId: '3833579.11.27740308000120.20220830180236-OB.21',
      txId: '52070b93b5b944c7ad4496110eb704fd',
      locId: 297,
      STATUS: STATUS.ATIVO,
      datacriacao: new Date('2022-08-29T19:50:55.644Z'),
      parcela: '001',
      valor: 0.7,
      linkQrCode: 'https://www.bcb.gov.br/pix/qr/3833511.11.27740308000120.20220829155055-OB.21 001',
      imagemQrcode: 'https://www.bcb.gov.br/pix/qr/3833511.11.27740308000120.20220829155055-OB.21 001',
      nomeCliente: 'Fulano de Tal',
      telefone: '11999999999',
      eMail: 'teste@teste.com',
      liberacaoKey: {
        codEmpresa: 1,
        codFilial: 999,
        cnpj: '00000000000000',
        idLiberacao: 'b01410411a314bf1a9e31a6b528c4711',
        origem: 'OB',
        codOrigem: 21,
        item: '001',
        nomeUsuario: 'ADMINISRADOR',
        estacaoTrabalho: 'SERVIDOR',
        ip: '0.0.0.0',
      },
    });

    expect(cobrancaPix).toBeInstanceOf(CobrancaPix);
    expect(cobrancaPix.sysId).toBe('3833579.11.27740308000120.20220830180236-OB.21');
  });
});

export default {};
