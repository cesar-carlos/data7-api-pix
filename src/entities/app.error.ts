export default class AppError extends Error {
  constructor(
    readonly id: string,
    readonly operaction: string,
    message: string,
    readonly details: string,
    readonly value: string,
  ) {
    super(message);
  }

  //create method from json
  static fromJson(json: any): AppError {
    return new AppError(json.id, json.operaction, json.message, json.details, json.value);
  }

  //create method to json
  toJson(): any {
    return {
      id: this.id,
      operaction: this.operaction,
      message: this.message,
      details: this.details,
      value: this.value,
    };
  }
}
