export default class ExpedicaoMutationListenEvent {
  Mutation: string[];

  constructor(params: { Mutation: string[] }) {
    this.Mutation = params.Mutation;
  }

  public toJson(): any {
    return { Mutation: this.Mutation };
  }
}
