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
    expect(httpResponse.status).toBe(400);
  });

  test('should return 400 if no password is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email',
      },
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.status).toBe(400);
  });
});
