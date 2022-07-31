export enum STATUS {
  ATIVA = 'ATIVA',
  CONCLUIDA = 'CONCLUIDA',
  REMOVIDA_PELO_USUARIO_RECEBEDOR = 'REMOVIDA_PELO_USUARIO_RECEBEDOR',
  REMOVIDA_PELO_PSP = 'REMOVIDA_PELO_PSP',
}

export type loc = {
  id: number;
  location: string;
  tipoCob: string;
  criacao: Date;
};

export type devedor = {
  cpf: string;
  nome: string;
};

export type valor = {
  original: string;
};

export type infoAdicionais = {
  nome: string;
  valor: string;
};

export type responseCreatePixDto = {
  calendario: { criacao: Date; expiracao: number };
  txid: string;
  revisao: number;
  loc: loc;
  location: string;
  status: STATUS;
  devedor: devedor;
  valor: valor;
  chave: string;
  solicitacaoPagador: string;
  infoAdicionais: infoAdicionais[];
};
