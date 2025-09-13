import { params, Pagination } from './local.base.params';

export default interface LocalBaseRepositoryContract<T> {
  select(pagination?: Pagination): Promise<T[]>;
  selectWhere(params: params[] | string, limit?: number, orderBy?: string): Promise<T[]>;
  insert(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
