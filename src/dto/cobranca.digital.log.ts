export default class CobrancaDigitalLogDto {
  constructor(readonly id: string, readonly message: string, readonly details: string) {}

  //create method from json
  static fromJson(json: any): CobrancaDigitalLogDto {
    return new CobrancaDigitalLogDto(json.id || json.ID, json.message || json.Message, json.details || json.Details);
  }

  //create method to json
  toJson(): any {
    return { id: this.id, message: this.message, details: this.details };
  }

  //create method from object
  static fromObject(object: any): CobrancaDigitalLogDto {
    return new CobrancaDigitalLogDto(
      object.id || object.ID,
      object.message || object.Message,
      object.details || object.Details,
    );
  }
}
