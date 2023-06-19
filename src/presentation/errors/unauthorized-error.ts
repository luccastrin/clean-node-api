export class UnAuthorizedError extends Error {
  constructor() {
    super('UnAuthorized');
  }
}
