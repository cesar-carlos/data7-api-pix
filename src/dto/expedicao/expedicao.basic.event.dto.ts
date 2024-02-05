export default class ExpedicaoBasicEventDto {
  Session: string;
  ResposeIn: string;
  Mutation: string[];
  Error?: string;

  constructor(params: { Session: string; ResposeIn: string; Mutation: string[]; Error?: string }) {
    this.Session = params.Session;
    this.ResposeIn = params.ResposeIn;
    this.Mutation = params.Mutation;
    this.Error = params.Error;
  }

  public toJson(): any {
    return {
      session: this.Session,
      resposeIn: this.ResposeIn,
      mutation: this.Mutation,
      error: this.Error ? this.Error : null,
    };
  }
}
