export default interface IBaseRepository<T> {
  getAll(cnpj: string): Promise<T[] | undefined>;
  getById(cnpj: string, id: string): Promise<T | undefined>;
  getByIdDate(cnpj: string, date: string, id: string): Promise<T | undefined>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
