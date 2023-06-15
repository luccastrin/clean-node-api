import { HttpResponse } from '../helpers/http-response';

type HttpRequest = {
  body?: HttpBody;
};

type HttpBody = {
  password?: string;
  email?: string;
};

export class LoginRouter {
  constructor(private authUseCase: any) {}

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
    this.authUseCase.auth(email, password);
    return {
      statusCode: 401,
    };
  }
}
