export enum eContext {
  sql_server = 'sql_server',
  sybase = 'sybase',
  fireBase = 'fireBase',
}

export interface Depedecy<T> {
  context: string;
  bind: string;
  instance: T;
}

export interface FindDepedecy {
  context: string;
  bind: string;
}

export default class ContainerDependency {
  private static _instance: ContainerDependency;
  private _dependencies: Depedecy<any>[] = [];

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public register<T>(params: Depedecy<T>) {
    this._dependencies.push(params);
  }

  public resolve<T>(params: FindDepedecy): T {
    const dependency = this._dependencies.find((x) => x.context === params.context && x.bind === params.bind);
    if (!dependency) throw new Error(`Dependency not found for context: ${params.context}`);
    return dependency.instance;
  }

  public clear() {
    this._dependencies = [];
  }
}
