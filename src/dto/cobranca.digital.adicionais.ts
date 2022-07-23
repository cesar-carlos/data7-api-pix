export default class CobrancaDigitalAdicionaisDto {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly codCobrancaDigital: number,
    readonly item: string,
    readonly adicional: string,
  ) {}
}
