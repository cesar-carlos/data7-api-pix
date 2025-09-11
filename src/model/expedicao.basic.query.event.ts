export default class ExpedicaoBasicSelectEvent {
  Session: string;
  ResponseIn: string;
  Data: string[];

  constructor(params: { Session: string; ResponseIn: string; Data: string[] }) {
    this.Session = params.Session;
    this.ResponseIn = params.ResponseIn;
    this.Data = params.Data;
  }

  public toJson(): any {
    return {
      Session: this.Session,
      EesposeIn: this.ResponseIn,
      Data: this.Data,
    };
  }
}
