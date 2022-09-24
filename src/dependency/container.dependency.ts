import { instanceId } from 'firebase-admin';

export enum eContext {
  sql_server = 'sql_server',
  sybase = 'sybase',
}

export interface Depedecy<T> {
  context: string;
  instance: T;
}

export default class ContainerDependency {
  private static _instance: ContainerDependency;
  private _dependencies: Depedecy<any>[] = [];

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public register<T>(context: eContext, type: T) {
    this._dependencies.push({ context, instance: type });
  }

  public resolve<T>(context: eContext): T {
    const dependency = this._dependencies.find((x) => x.context === context);

    if (!dependency) {
      throw new Error(`Dependency not found for context: ${context}`);
    }

    return dependency.instance;
  }

  public clear() {
    this._dependencies = [];
  }
}
