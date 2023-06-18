import { HttpResponse } from '../helpers/http-response';

type HttpRequest = {
  body: HttpBody;
};

type HttpBody = {
  password: string;
  email: string;
};

export class LoginRouter {
  constructor(private authUseCase: any) {}

  route(httpRequest?: any): any {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest('email');
      }
      if (!password) {
        return HttpResponse.badRequest('password');
      }

      const acessToken = this.authUseCase.auth(email, password);
      if (!acessToken) {
        return HttpResponse.unAuthorizedError();
      }
      return HttpResponse.ok({ acessToken });
    } catch (error) {
      return HttpResponse.serverError();
    }
  }
}
