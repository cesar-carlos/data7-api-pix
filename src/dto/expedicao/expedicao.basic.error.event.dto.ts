export default class ExpedicaoBasicErrorEventDto {
  Session: string;
  ResposeIn: string;
  Error: string[];

  constructor(params: { Session: string; ResposeIn: string; Error: string[] }) {
    this.Session = params.Session;
    this.ResposeIn = params.ResposeIn;
    this.Error = params.Error;
  }

  public toJson(): any {
    return {
      session: this.Session,
      resposeIn: this.ResposeIn,
      error: this.Error,
    };
  }
}
