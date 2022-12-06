import { DataBase, requestCobrancaDTO } from '../src/dto/request.cobranca.dto';

const CobSysId = '7909893.11.08899540000160.20220923162930.OB.118581';

const DataBase = {
  Provedor: 'SQL_SERVER',
  Usuario: 'sa',
  Senha: '123abc.',
  Servidor: 'LOCALHOST',
  Base: 'Artemax',
  Porta: 1433,
};

const Usuario = {
  CodUsuario: 1,
  NomeUsuario: 'Administrador',
  EstacaoTrabalho: 'CESAR',
  IP: '127.0.0.1',
};

const Filial = {
  CodEmpresa: 1,
  CodFilial: 1,
  Nome: 'ARTEMAX INDUSTRIA E COMERCIO DE FERRAGENS E FERRAMENTAS LTDA',
  CNPJ: process.env.CNPJ ?? '00000000000000',
};

const Cliente = {
  CodEmpresa: 1,
  CodFilial: 1,
  CodCobrancaDigital: 99999999,
  CodCliente: 1,
  NomeCliente: 'CONSUMIDOR FINAL',
  CNPJ_CPF: '00000000000',
  Telefone: '00 0000 0000',
  EMail: 'cesar@se7esistemas.com.br',
  Endereco: 'Rua Bolonha',
  Numero: '844',
  Complemento: '',
  Bairro: 'Jardim barcelona',
  CEP: '78555-351',
  CodigoIBGE: '000000',
  NomeMunicipio: 'Sinop',
  UF: 'MT',
};

const LiberacaoKey = {
  CodEmpresa: 1,
  CodFilial: 1,
  CNPJ: process.env.CNPJ ?? '00000000000000',
  Origem: 'OB',
  CodOrigem: 99999999,
  nomeUsuario: 'Administrador',
  estacaoTrabalho: 'CESAR',
  IP: '127.0.0.1',
};

const Parcelas = [
  {
    SysId: '7909893.11.08899540000160.20220923162930.OB.118581-002',
    Origem: 'OB',
    CodOrigem: 99999999,
    LiberacaoKey: LiberacaoKey,
    NumeroParcela: '001',
    QtdParcela: 2,
    TipoCobranca: 'PIX',
    DataEmissao: new Date(Date.now()),
    DataVenda: new Date(Date.now()),
    DataVencimento: new Date(Date.now()),
    ValorParcela: 0.06,
    Observacao: 'TESTE DE SISTEMA PARCELA 001',
  },
];

export const requestCobrancaDtoMock: requestCobrancaDTO = {
  CobSysId,
  DataBase,
  Filial,
  Usuario,
  Cliente,
  Parcelas,
};
