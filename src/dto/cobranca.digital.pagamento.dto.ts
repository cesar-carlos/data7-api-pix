export default class CobrancaDigitalPagamentoDto {
  readonly sysId: string;
  readonly sequencia: number;
  readonly status: string;
  readonly dataPagamento: Date;
  readonly valor: number;
  readonly observacao: string;

  constructor(params: {
    sysId: string;
    sequencia: number;
    status: string;
    dataPagamento: Date;
    valor: number;
    observacao: string;
  }) {
    this.sysId = params.sysId;
    this.sequencia = params.sequencia;
    this.status = params.status;
    this.dataPagamento = params.dataPagamento;
    this.valor = params.valor;
    this.observacao = params.observacao;
  }

  static create = (params: {
    sysId: string;
    sequencia: number;
    status: string;
    dataPagamento: Date;
    valor: number;
    observacao: string;
  }) => new CobrancaDigitalPagamentoDto(params);

  static fromObject(object: any) {
    return new CobrancaDigitalPagamentoDto({
      sysId: object.sysId || object.SysId,
      sequencia: object.sequencia || object.Sequencia,
      status: object.status || object.Status,
      dataPagamento: object.dataPagamento || object.DataPagamento,
      valor: object.valor || object.Valor,
      observacao: object.observacao || object.Observacao,
    });
  }
}
