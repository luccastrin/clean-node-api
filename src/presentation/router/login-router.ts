type HttpRequest = {
  body?: HttpBody;
};

type HttpBody = {
  password?: string;
  email?: string;
};

class HttpResponse {
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

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`missing param: ${paramName}`);
    this.name = 'MissingParamError';
  }
}

export class LoginRouter {
  route(httpRequest?: HttpRequest): any {
    const { email, password } = httpRequest?.body || {};
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.ServerError();
    }
    if (!email) {
      return HttpResponse.BadRequest('email');
    }
    if (!password) {
      return HttpResponse.BadRequest('password');
    }
  }
}
