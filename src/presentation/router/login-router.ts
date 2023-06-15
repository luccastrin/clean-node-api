type HttpRequest = {
  body?: HttpBody;
};

type HttpBody = {
  password?: string;
  email?: string;
};

type HttpResponse = {
  statusCode?: number;
};

export class LoginRouter {
  route(httpRequest?: HttpRequest): any {
    const { email, password } = httpRequest?.body || {};
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500,
      };
    }
    if (!email || !password) {
      return {
        statusCode: 400,
      };
    }
  }
}
