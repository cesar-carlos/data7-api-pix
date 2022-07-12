type params = {
  txid: string;
};

type devedor = {
  cpf: string;
  nome: string;
};

type valor = {
  original: string;
};

type infoAdicionais = {
  nome: string;
  valor: string;
};

export type requestCreatePixDto = {
  sysId: string;
  params: params;
  calendario: { expiracao: number };
  devedor: devedor;
  valor: valor;
  chave: string;
  solicitacaoPagador: string;
  infoAdicionais: [infoAdicionais];
};
