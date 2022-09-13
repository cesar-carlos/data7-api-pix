import { STATUS } from '../type/status';
export default class ItemLiberacaoBloqueioSituacao {
  readonly codLiberacaoBloqueio: number;
  readonly item: string;
  readonly status: STATUS;
  readonly rotinaLiberacao: string | undefined;
  readonly dataHoraLiberacao: Date | undefined;
  readonly codUsuarioLiberacao: number | undefined;
  readonly estacaoTrabalhoLiberacao: string | undefined;
  readonly observacaoLiberacao: string | undefined;
  readonly motivoRejeicaoLiberacaoBloqueio: string | undefined;
  readonly complemento: string | undefined;

  constructor(params: {
    codLiberacaoBloqueio: number;
    item: string;
    status: STATUS;
    rotinaLiberacao: string | undefined;
    dataHoraLiberacao: Date | undefined;
    codUsuarioLiberacao: number | undefined;
    estacaoTrabalhoLiberacao: string | undefined;
    observacaoLiberacao: string | undefined;
    motivoRejeicaoLiberacaoBloqueio: string | undefined;
    complemento: string | undefined;
  }) {
    this.codLiberacaoBloqueio = params.codLiberacaoBloqueio;
    this.item = params.item;
    this.status = params.status;
    this.rotinaLiberacao = params.rotinaLiberacao;
    this.dataHoraLiberacao = params.dataHoraLiberacao;
    this.codUsuarioLiberacao = params.codUsuarioLiberacao;
    this.estacaoTrabalhoLiberacao = params.estacaoTrabalhoLiberacao;
    this.observacaoLiberacao = params.observacaoLiberacao;
    this.motivoRejeicaoLiberacaoBloqueio = params.motivoRejeicaoLiberacaoBloqueio;
    this.complemento = params.complemento;
  }

  static create(params: {
    codLiberacaoBloqueio: number;
    item: string;
    status: STATUS;
    rotinaLiberacao: string;
    dataHoraLiberacao: Date;
    codUsuarioLiberacao: number;
    estacaoTrabalhoLiberacao: string;
    observacaoLiberacao: string;
    motivoRejeicaoLiberacaoBloqueio: string;
    complemento: string;
  }) {
    return new ItemLiberacaoBloqueioSituacao(params);
  }

  static fromObject(object: any) {
    return new ItemLiberacaoBloqueioSituacao({
      codLiberacaoBloqueio: object.CodLiberacaoBloqueio || object.codLiberacaoBloqueio,
      item: object.Item || object.item,
      status: object.Status || object.status,
      rotinaLiberacao: object.RotinaLiberacao || object.rotinaLiberacao,
      dataHoraLiberacao: object.DataHoraLiberacao || object.dataHoraLiberacao,
      codUsuarioLiberacao: object.CodUsuarioLiberacao || object.codUsuarioLiberacao,
      estacaoTrabalhoLiberacao: object.EstacaoTrabalhoLiberacao || object.estacaoTrabalhoLiberacao,
      observacaoLiberacao: object.ObservacaoLiberacao || object.observacaoLiberacao,
      motivoRejeicaoLiberacaoBloqueio: object.MotivoRejeicaoLiberacaoBloqueio || object.motivoRejeicaoLiberacaoBloqueio,
      complemento: object.Complemento || object.complemento,
    });
  }
}
