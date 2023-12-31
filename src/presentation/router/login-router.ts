import { InvalidParamError, MissingParamError } from '../../utils/errors';
import { HttpResponse } from '../helpers/http-response';

type HttpRequest = {
  body: HttpBody;
};

type HttpBody = {
  password: string;
  email: string;
};

export class LoginRouter {
  constructor(private authUseCase: any, private emailValidator?: any) {}

  async route(httpRequest?: any): Promise<any> {
    try {
      const { email, password } = httpRequest.body;
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'));
      }
      if (!this.emailValidator.isValid(email)) {
        return HttpResponse.badRequest(new InvalidParamError('email'));
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
