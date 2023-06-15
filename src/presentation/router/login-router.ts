type HttpRequest = {
  body: {
    password?: string;
    email?: string;
  };
};

type HttpResponse = {
  status?: number;
};

export class LoginRouter {
  route(httpRequest: HttpRequest): any {
    const { email, password } = httpRequest.body;
    if (!email) {
      return {
        status: 400,
      };
    }

    if (!password) {
      return {
        status: 400,
      };
    }
  }
}
