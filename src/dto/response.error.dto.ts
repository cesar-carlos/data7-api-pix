export default class ResponseErrorDto {
  readonly error: string;
  readonly message: string;
  readonly statusCode: number;

  constructor(params: { error: string; message: string; statusCode: number }) {
    this.error = params.error;
    this.message = params.message;
    this.statusCode = params.statusCode;
  }
}
