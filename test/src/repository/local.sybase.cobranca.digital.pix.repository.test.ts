import CobrancaDigitalPixDto from '../../../src/dto/cobranca.digital.pix.dto';
import LocalSybaseCobrancaDigitalPixRepository from '../../../src/repository/local.sybase.cobranca.digital.pix.repository';

describe('CRUD (Integracao.CobrancaDigitalPix)', () => {
  const repository = new LocalSybaseCobrancaDigitalPixRepository();
  const newEntity = new CobrancaDigitalPixDto({
    sysId: '3833579.11.27740308000120.20220830180236-OB.21 001',
    sequencia: 1,
    txId: '55555',
    dataCriacao: new Date('2021-08-30T18:02:36.000Z'),
    dataExpiracao: new Date('2021-08-30T18:02:36.000Z'),
    qrCode: '998',
    imagemQrcode: '998',
    valor: 0.01,
  });

  const upEntity = new CobrancaDigitalPixDto({
    sysId: '3833579.11.27740308000120.20220830180236-OB.21 001',
    sequencia: 1,
    txId: '55555',
    dataCriacao: new Date('2021-08-30T18:02:36.000Z'),
    dataExpiracao: new Date('2021-08-30T18:02:36.000Z'),
    qrCode: '999',
    imagemQrcode: '999',
    valor: 0.01,
  });

  it('deve inserir uma novo resitro', async () => {
    const result = await repository.insert(newEntity);
  });

  it('deve ler registro gravado', async () => {
    const params = [
      { key: 'SysId', value: '3833579.11.27740308000120.20220830180236-OB.21 001' },
      { key: 'Sequencia', value: 1 },
    ];

    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].qrCode).toBe(newEntity.qrCode);
  });

  it('deve atualizar registro gravado', async () => {
    const params = [
      { key: 'SysId', value: '3833579.11.27740308000120.20220830180236-OB.21 001' },
      { key: 'Sequencia', value: 1 },
    ];

    const result = await repository.update(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity?.length).toBe(1);
    expect(entity?.[0].qrCode).toBe(upEntity.qrCode);
  });

  it('deve deletar registro gravado', async () => {
    const params = [
      { key: 'SysId', value: '3833579.11.27740308000120.20220830180236-OB.21 001' },
      { key: 'Sequencia', value: 1 },
    ];

    const result = await repository.delete(upEntity);
    const entity = await repository.selectWhere(params);
    expect(entity).toBe(undefined);
  });
});

export default {};
