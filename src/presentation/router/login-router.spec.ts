import { LoginRouter } from './login-router';

describe('Login Router', () => {
  test('should return 400 if no email is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 400 if no password is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 500 if no httRequest is provided', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toBe(500);
  });

  test('should return 500 if httpRequest has no body is provided', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route({});
    expect(httpResponse.statusCode).toBe(500);
  });
});
