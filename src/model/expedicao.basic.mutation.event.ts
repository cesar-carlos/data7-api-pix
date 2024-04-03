export default class ExpedicaoMutationBasicEvent {
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
      Session: this.Session,
      ResposeIn: this.ResposeIn,
      Mutation: this.Mutation,
    };
  }
}
