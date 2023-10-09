export type param<P> = {
  key: string;
  value: P;
  operator: string;
};

export abstract class params {
  public static create<P>(key: string, value: P): param<P> {
    return { key, value, operator: '=' };
  }
}

export default interface LocalBaseRepositoryContract<T> {
  select(): Promise<T[] | undefined>;
  selectWhere<P>(params: params[]): Promise<T[] | undefined>;
  insert(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
