export default class CobrancaDigitalDataBaseDto {
  constructor(
    readonly codCobrancaDigitalDataBase: number,
    readonly provedor: string,
    readonly usuario: string,
    readonly senha: string,
    readonly servidor: string,
    readonly base: string,
    readonly porta: number,
  ) {}
}
