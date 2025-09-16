import { params, Pagination, OrderBy } from './local.base.params';

export default interface LocalBaseConsultaRepositoryContract<T> {
  select(pagination?: Pagination): Promise<T[]>;
  selectWhere<P>(params: params[] | string, pagination?: Pagination, orderBy?: OrderBy): Promise<T[]>;
}
