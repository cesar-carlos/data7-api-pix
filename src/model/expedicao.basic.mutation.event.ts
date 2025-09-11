export default class ExpedicaoMutationBasicEvent {
  Session: string;
  ResponseIn: string;
  Mutation: string[];

  constructor(params: { Session: string; ResponseIn: string; Mutation: string[] }) {
    this.Session = params.Session;
    this.ResponseIn = params.ResponseIn;
    this.Mutation = params.Mutation;
  }

  public toJson(): any {
    return {
      Session: this.Session,
      ResponseIn: this.ResponseIn,
      Mutation: this.Mutation,
    };
  }
}
