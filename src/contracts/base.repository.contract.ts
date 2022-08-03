export default interface ContractBaseRepository<T> {
  find(id: string): Promise<T | undefined>;
  findAll(): Promise<T[] | undefined>;
  insert(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  delete(id: string): Promise<void>;
}
