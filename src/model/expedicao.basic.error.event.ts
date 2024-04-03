export default class ExpedicaoBasicErrorEvent {
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
      Session: this.Session,
      ResposeIn: this.ResposeIn,
      Error: this.Error,
    };
  }
}
