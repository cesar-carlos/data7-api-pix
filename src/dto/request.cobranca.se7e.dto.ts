export type Filial = {
  CodEmpresa: number;
  CodFilial: number;
  Nome: string;
  CNPJ: string;
};

export type Usuario = {
  CodUsuario: number;
  NomeUsuario: string;
  EstacaoTrabalho: string;
  IP: string;
};

export type Cliente = {
  CodCliente: number;
  NomeCliente: string;
  CNPJ_CPF: string;
  Telefone: string;
  EMail: string;
  Endereco: string;
  Numero: string;
  Complemento: string;
  Bairro: string;
  CEP: string;
  CodigoIBGE: string;
  NomeMunicipio: string;
  UF: string;
};

export type LiberacaoKey = {
  IdLiberacao: string;
  CodEmpresa: number;
  CodFilial: number;
  Origem: string;
  CodOrigem: number;
  Item: string;
};

export type Parcela = {
  Origem: string;
  CodOrigem: number;
  NumeroParcela: string;
  CodFormaPagamento: string;
  DataEmissao: Date;
  DataVenda: Date;
  DataVencimento: Date;
  ValorLiquido: number;
  ValorParcela: number;
  Observacao: string;
};

export type requestCobrancaSe7eDto = {
  Id: string;
  Filial: Filial;
  Usuario: Usuario;
  Cliente: Cliente;
  LiberacaoKey: LiberacaoKey;
  Parcelas: Parcela[];
};
