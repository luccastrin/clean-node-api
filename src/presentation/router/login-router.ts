import { HttpResponse } from '../helpers/http-response';

type HttpRequest = {
  body?: HttpBody;
};

type HttpBody = {
  password?: string;
  email?: string;
};

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
