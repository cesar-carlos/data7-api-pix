export default interface DataBaseActiveContract<T> {
  getDataBaseInfo(): Promise<T | string>;
}
