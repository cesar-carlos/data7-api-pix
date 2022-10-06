export default interface ConnectionBaseSqlContract<T> {
  getConnection(): Promise<T>;
  closeConnection(conn: T): Promise<void>;
}
