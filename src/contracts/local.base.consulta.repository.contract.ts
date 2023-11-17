import { params, pagination } from './local.base.params';

export default interface LocalBaseConsultaRepositoryContract<T> {
  select(pagination?: pagination): Promise<T[]>;
  selectWhere<P>(params: params[] | string, pagination?: pagination): Promise<T[]>;
}
