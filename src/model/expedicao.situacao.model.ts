export abstract class ExpedicaoSituacaoModel {
  static readonly aguardando: string = 'AGUARDANDO';
  static readonly emAndamento: string = 'EM ANDAMENTO';
  static readonly emPausa: string = 'EM PAUSA';
  static readonly finalizada: string = 'FINALIZADA';
  static readonly cancelada: string = 'CANCELADA';
  static readonly entregue: string = 'ENTREGUE';
  static readonly devolvida: string = 'DEVOLVIDA';
  static readonly separada: string = 'SEPARADA';
  static readonly separando: string = 'SEPARANDO';
  static readonly naoLocalizada: string = 'NÃO LOCALIZADO';

  static situacao: { [key: string]: string } = {
    [ExpedicaoSituacaoModel.aguardando]: 'Aguardando',
    [ExpedicaoSituacaoModel.emAndamento]: 'Em Andamento',
    [ExpedicaoSituacaoModel.emPausa]: 'Em Pausa',
    [ExpedicaoSituacaoModel.finalizada]: 'Finalizada',
    [ExpedicaoSituacaoModel.cancelada]: 'Cancelada',
    [ExpedicaoSituacaoModel.entregue]: 'Entregue',
    [ExpedicaoSituacaoModel.devolvida]: 'Devolvida',
    [ExpedicaoSituacaoModel.separada]: 'Separada',
    [ExpedicaoSituacaoModel.separando]: 'Separando',
    [ExpedicaoSituacaoModel.naoLocalizada]: 'Não Localizada',
    '': '',
  };
}
