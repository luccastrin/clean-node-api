import { MissingParamError } from './missing-param-errors';

export class HttpResponse {
  static BadRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static ServerError() {
    return {
      statusCode: 500,
    };
  }
}
