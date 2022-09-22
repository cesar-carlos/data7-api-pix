export enum eContext {
  sql_server = 'sql_server',
  sybase = 'sybase',
}

export interface Depedecy<T> {
  context: string;
  type: T;
}

export default class ContainerDependency {
  private static _instance: ContainerDependency;
  private _dependencies: Depedecy<any>[] = [];

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public register<T>(context: eContext, type: T) {
    this._dependencies.push({ context, type });
  }

  public resolve<T>(context: eContext, type: T): T {
    console.log(type);

    const dependency = this._dependencies.find((deps) => {
      if (deps.context === context) {
        return deps;
      }
    });

    if (!dependency) throw new Error(`Dependency for context ${context} not found`);
    return dependency.type;
  }

  public clear() {
    this._dependencies = [];
  }
}
