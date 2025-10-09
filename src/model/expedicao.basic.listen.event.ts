export default class ExpedicaoBasicListenEvent {
  ResponseIn: string;
  Data: string[];

  constructor(params: { ResponseIn: string; Data: string[] }) {
    this.ResponseIn = params.ResponseIn;
    this.Data = params.Data;
  }

  public toJson(): any {
    return {
      ResponseIn: this.ResponseIn,
      Data: this.Data,
    };
  }
}
