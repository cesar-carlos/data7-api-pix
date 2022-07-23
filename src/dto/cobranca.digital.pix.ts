export default class CobrancaDigitalPixDto {
  constructor(
    readonly codEmpresa: number,
    readonly codFilial: number,
    readonly codCobrancaDigital: number,
    readonly item: string,
    readonly endToEndId: string,
    readonly dataCriacao: Date,
    readonly dataExpiracao: Date,
    readonly qrCode: string,
    readonly imagemQrcode: string,
  ) {}
}
