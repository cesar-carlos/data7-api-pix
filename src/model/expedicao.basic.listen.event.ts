export default class ExpedicaoBasicListenEvent {
  Data: string[];

  constructor(params: { Data: string[] }) {
    this.Data = params.Data;
  }

  public toJson(): any {
    return { Data: this.Data };
  }
}
