export default class CobrancaDigitalTituloDto {
  constructor(
    readonly CodEmpresa: number,
    readonly CodFilial: number,
    readonly CodCobrancaDigital: number,
    readonly item: string,
    readonly origem: string,
    readonly codOrigem: number,
    readonly status: string,
    readonly txId: string,
    readonly sysId: string,
    readonly LocId: string,
    readonly chave: string,
    readonly tipoCob: string,
    readonly codFormaPagamento: string,
    readonly numeroTitulo: string,
    readonly numeroParcela: string,
    readonly dataEmissao: Date,
    readonly dataVenda: Date,
    readonly dataVencimento: Date,
    readonly valor: number,
    readonly observacao: number,
  ) {}
}
