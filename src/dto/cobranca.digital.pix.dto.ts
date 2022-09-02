export default class CobrancaDigitalPixDto {
  readonly sysId: string;
  readonly sequencia: number;
  readonly endToEndId: string;
  readonly dataCriacao: Date;
  readonly dataExpiracao: Date;
  readonly qrCode: string;
  readonly imagemQrcode: string;

  constructor(params: {
    sysId: string;
    sequencia: number;
    endToEndId: string;
    dataCriacao: Date;
    dataExpiracao: Date;
    qrCode: string;
    imagemQrcode: string;
  }) {
    this.sysId = params.sysId;
    this.sequencia = params.sequencia;
    this.endToEndId = params.endToEndId;
    this.dataCriacao = params.dataCriacao;
    this.dataExpiracao = params.dataExpiracao;
    this.qrCode = params.qrCode;
    this.imagemQrcode = params.imagemQrcode;
  }

  static create(params: {
    sysId: string;
    sequencia: number;
    endToEndId: string;
    dataCriacao: Date;
    dataExpiracao: Date;
    qrCode: string;
    imagemQrcode: string;
  }) {
    return new CobrancaDigitalPixDto(params);
  }

  static fromObject(object: any) {
    return new CobrancaDigitalPixDto({
      sysId: object.sysId || object.SysId,
      sequencia: object.sequencia || object.Sequencia,
      endToEndId: object.endToEndId || object.EndToEndId,
      dataCriacao: object.dataCriacao || object.DataCriacao,
      dataExpiracao: object.dataExpiracao || object.DataExpiracao,
      qrCode: object.qrCode || object.QrCode,
      imagemQrcode: object.imagemQrcode || object.ImagemQrcode,
    });
  }
}
