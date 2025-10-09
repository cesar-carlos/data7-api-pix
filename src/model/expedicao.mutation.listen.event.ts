export default class ExpedicaoMutationListenEvent {
  ResponseIn: string;
  Mutation: string[];

  constructor(params: { ResponseIn: string; Mutation: string[] }) {
    this.ResponseIn = params.ResponseIn;
    this.Mutation = params.Mutation;
  }

  public toJson(): any {
    return {
      ResponseIn: this.ResponseIn,
      Mutation: this.Mutation,
    };
  }
}
