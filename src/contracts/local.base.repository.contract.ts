import { params, pagination } from './local.base.params';

export default interface LocalBaseRepositoryContract<T> {
  select(pagination?: pagination): Promise<T[]>;
  selectWhere<P>(params: params[] | string, pagination?: pagination): Promise<T[]>;
  insert(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(entity: T): Promise<void>;
}
