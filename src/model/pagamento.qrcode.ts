export default class PagamentoQrCode {
  constructor(readonly qrcode: string, readonly imagemQrcode: string) {}

  //create method from json
  static fromJson(json: any): PagamentoQrCode {
    return new PagamentoQrCode(json.qrcode, json.imagemQrcode);
  }

  //create method to json
  toJson(): any {
    return {
      qrcode: this.qrcode,
      imagemQrcode: this.imagemQrcode,
    };
  }

  //create method from object
  static fromObject(obj: any): PagamentoQrCode {
    return new PagamentoQrCode(obj.qrcode, obj.imagemQrcode);
  }
}
