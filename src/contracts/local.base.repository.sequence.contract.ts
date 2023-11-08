import { params, pagination } from './local.base.params';

export default interface LocalBaseRepositorySequenceContract<T> {
  select(name: string): Promise<T | undefined>;
}
