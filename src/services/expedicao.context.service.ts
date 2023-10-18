export default class ExpedicaoContextService {
  private static _instance: ExpedicaoContextService;

  private _context = <any>[];

  private constructor() {}

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public add(context: any) {
    this._context.push(context);
  }

  public get() {
    return this._context;
  }
}
