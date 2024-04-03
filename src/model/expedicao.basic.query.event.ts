export default class ExpedicaoBasicSelectEvent {
  Session: string;
  ResposeIn: string;
  Data: string[];

  constructor(params: { Session: string; ResposeIn: string; Data: string[] }) {
    this.Session = params.Session;
    this.ResposeIn = params.ResposeIn;
    this.Data = params.Data;
  }

  public toJson(): any {
    return {
      Session: this.Session,
      EesposeIn: this.ResposeIn,
      Data: this.Data,
    };
  }
}
