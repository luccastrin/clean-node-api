import { UnAuthorizedError } from './anauthorized-error';
import { MissingParamError } from './missing-param-error';
import { ServerError } from './server-error';

export class HttpResponse {
  static badRequest(paramName: string) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName),
    };
  }

  static serverError() {
    return {
      statusCode: 500,
      body: new ServerError(),
    };
  }

  static unAuthorizedError() {
    return {
      statusCode: 401,
      body: new UnAuthorizedError(),
    };
  }

  static ok(data: any) {
    return {
      statusCode: 200,
      body: data,
    };
  }
}
