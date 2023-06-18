import { HttpResponse } from '../helpers/http-response';
import { MissingParamError } from '../helpers/missing-param-error';

type HttpRequest = {
  body: HttpBody;
};

type HttpBody = {
  password: string;
  email: string;
};

export class LoginRouter {
  constructor(private authUseCase: any) {}

  async route(httpRequest?: any): Promise<any> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'));
      }

      const acessToken = await this.authUseCase.auth(email, password);
      if (!acessToken) {
        return HttpResponse.unAuthorizedError();
      }
      return HttpResponse.ok({ acessToken });
    } catch (error) {
      return HttpResponse.serverError();
    }
  }
}
