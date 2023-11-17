export default class ExpedicaoBasicEventDto {
  Session: string;
  ResposeIn: string;
  Mutation: string[];

  constructor(params: { Session: string; ResposeIn: string; Mutation: string[] }) {
    this.Session = params.Session;
    this.ResposeIn = params.ResposeIn;
    this.Mutation = params.Mutation;
  }

  public toJson(): any {
    return {
      session: this.Session,
      resposeIn: this.ResposeIn,
      mutation: this.Mutation,
    };
  }
}
