export default class ExpedicaoBasicErrorEvent {
  Session: string;
  ResponseIn: string;
  Error: string[];

  constructor(params: { Session: string; ResponseIn: string; Error: string[] }) {
    this.Session = params.Session;
    this.ResponseIn = params.ResponseIn;
    this.Error = params.Error;
  }

  public toJson(): any {
    return {
      Session: this.Session,
      ResponseIn: this.ResponseIn,
      Error: this.Error,
    };
  }
}
