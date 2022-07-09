export type params = { key: string; value: any };

export default interface LocalBaseRepositoryContract<T> {
  select(): Promise<T[] | undefined>;
  selectWhere(params: params[]): Promise<T[] | undefined>;
  insert(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
