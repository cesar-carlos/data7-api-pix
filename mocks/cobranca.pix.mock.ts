import CobrancaPixInputDTO from '../src/dto/cobranca.pix.input.dto';

const cobrancaPixInputDTO = new CobrancaPixInputDTO({
  id: '7909893.11.08899540000160.20220923162930.OB.118581',
  expiracao: 3600,
  cnpj_cpf: '00000000000',
  nome: 'CONSUMIDOR FINAL',
  valor: 0.06,
  solicitacaoPagador: 'TESTE DE SISTEMA PARCELA 001',
  infoAdicionais: [],
});

export { cobrancaPixInputDTO };
