import { STATUS } from '../type/status';

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
