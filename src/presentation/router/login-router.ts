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
      return HttpResponse.serverError();
    }
    if (!email) {
      return HttpResponse.badRequest('email');
    }
    if (!password) {
      return HttpResponse.badRequest('password');
    }
    this.authUseCase.auth(email, password);
    return HttpResponse.unAuthorizedError();
  }
}
