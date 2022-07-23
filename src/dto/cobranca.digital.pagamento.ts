export default class CobrancaDigitalPagamentoDto {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly codCobrancaDigital: number,
    readonly item: string,
    readonly status: string,
    readonly dataPagamento: Date,
    readonly valor: string,
  ) {}
}
