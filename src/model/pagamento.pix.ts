export default class PagamentoPIX {
  constructor(readonly qrcode: string, readonly imagemQrcode: string) {}

  //create method from object
  static fromObject(obj: any): PagamentoPIX {
    return new PagamentoPIX(obj.qrcode, obj.imagemQrcode);
  }

  //create method from json
  static fromJson(json: any): PagamentoPIX {
    return new PagamentoPIX(json.qrcode, json.imagemQrcode);
  }

  //create method to json
  toJson(): any {
    return {
      qrcode: this.qrcode,
      imagemQrcode: this.imagemQrcode,
    };
  }
}
