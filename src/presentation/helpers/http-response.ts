import { ServerError } from '../errors/server-error';
import { UnAuthorizedError } from '../errors/unauthorized-error';

export class HttpResponse {
  static badRequest(error: any) {
    return {
      statusCode: 400,
      body: error,
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
