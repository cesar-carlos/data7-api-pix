import Filial from '../src/entities/filial';
import Usuario from '../src/entities/usuario';
import Cliente from '../src/entities/cliente';
import Cobranca from '../src/entities/cobranca';
import CobrancaParcela from '../src/entities/cobranca.parcela';
import CobrancaLiberacaoKey from '../src/entities/cobranca.liberacao.key';

const id = '7909893.11.08899540000160.20220923162930.OB.118581';

const usuario = new Usuario({
  codUsuario: 1,
  nomeUsuario: 'Adiministrador',
  estacaoTrabalho: 'Servidor',
});

const filial = new Filial({
  codEmpresa: 999,
  codFilial: 1,
  nome: 'Filial 1',
  cnpj: process.env.CNPJ ?? '00000000000000',
});

const cliente = new Cliente({
  codEmpresa: 1,
  codFilial: 1,
  codCobrancaDigital: 99999999,
  codCliente: 1,
  nomeCliente: 'CONSUMIDOR FINAL',
  cnpj_cpf: '00000000000',
  telefone: '00 0000 0000',
  eMail: 'cesar@se7esistemas.com.br',
  endereco: 'Rua Bolonha',
  numero: '844',
  complemento: '',
  bairro: 'Jardim barcelona',
  cep: '78555-351',
  codigoIBGE: '000000',
  nomeMunicipio: 'Sinop',
  uf: 'MT',
});

const cobrancaLiberacaoKey = new CobrancaLiberacaoKey({
  codEmpresa: 1,
  codFilial: 1,
  cnpj: process.env.CNPJ ?? '00000000000000',
  idLiberacao: '',
  origem: 'OB',
  codOrigem: 99999999,
  item: '001',
  nomeUsuario: 'USUARIO',
  estacaoTrabalho: 'SERVIDOR',
  ip: '127.0.0.1',
});

const parcelas: CobrancaParcela[] = [
  new CobrancaParcela({
    sysId: '7909893.11.08899540000160.20220923162930.OB.118581-002',
    origem: 'OB',
    codOrigem: 99999999,
    liberacaoKey: cobrancaLiberacaoKey,
    numeroParcela: '001',
    qtdParcela: 2,
    tipoCobranca: 'PIX',
    dataEmissao: new Date(Date.now()),
    dataVenda: new Date(Date.now()),
    dataVencimento: new Date(Date.now()),
    valorParcela: 0.06,
    observacao: 'TESTE DE SISTEMA PARCELA 001',
  }),
];

export const cobrancaMock = new Cobranca(id, usuario, filial, cliente, parcelas);
