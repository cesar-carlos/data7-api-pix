export default interface IBaseRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | undefined>;
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
