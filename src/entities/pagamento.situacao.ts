import PagamentoPix from './pagamento.pix';

type devedor = {
  cpf: string;
  nome: string;
};

export enum eStatus {
  ATIVA = 'ATIVA',
  CONCLUIDA = 'CONCLUIDA',
  REMOVIDA_PELO_USUARIO_RECEBEDOR = 'REMOVIDA_PELO_USUARIO_RECEBEDOR',
  REMOVIDA_PELO_PSP = 'REMOVIDA_PELO_PSP',
}

export default class PagamentoSituacao {
  constructor(
    readonly txId: string,
    readonly sysId: string,
    readonly locId: number,
    readonly status: eStatus,
    readonly chave: string,
    readonly devedor: devedor,
    readonly dataAbertura: Date,
    readonly location: string,
    readonly valor: number,
    readonly pix?: PagamentoPix[],
  ) {}
}
