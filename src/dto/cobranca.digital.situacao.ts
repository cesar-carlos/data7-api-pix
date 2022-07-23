export default class CobrancaDigitalSituacaoDto {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly CodCobrancaDigital: number,
    readonly status: string,
    readonly item: string,
    readonly sysId: string,
    readonly txId: string,
    readonly locId: string,
    readonly chave: string,
  ) {}
}
