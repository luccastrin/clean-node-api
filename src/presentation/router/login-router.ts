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
    if (
      !httpRequest ||
      !httpRequest.body ||
      !this.authUseCase ||
      !this.authUseCase.auth
    ) {
      return HttpResponse.serverError();
    }

    if (!email) {
      return HttpResponse.badRequest('email');
    }
    if (!password) {
      return HttpResponse.badRequest('password');
    }

    let acessToken = this.authUseCase.auth(email, password);
    if (!acessToken) {
      return HttpResponse.unAuthorizedError();
    }

    return HttpResponse.ok({ acessToken });
  }
}
