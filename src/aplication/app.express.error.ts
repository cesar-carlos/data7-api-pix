export default class AppExpressError extends Error {
  constructor(message: string) {
    super(message);
  }
}
