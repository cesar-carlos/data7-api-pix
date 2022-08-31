export default class CobrancaDigitalAdicionaisDto {
  constructor(
    readonly codEmpresa: number,
    readonly codCobrancaDigital: number,
    readonly item: string,
    readonly sequencia: number,
    readonly adicional: string,
  ) {}
}
