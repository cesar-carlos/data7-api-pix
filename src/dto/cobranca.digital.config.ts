export default class CobrancaDigitalConfigDto {
  constructor(
    readonly codEmpresa: number,
    readonly codConfiguracao: number,
    readonly ativo: string,
    readonly gerenciadora: string,
    readonly clientId: string,
    readonly clientSecret: string,
    readonly certificado: any,
  ) {}
}
