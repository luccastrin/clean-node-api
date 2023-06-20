import { InvalidParamError, MissingParamError } from '../../utils/errors';

interface Auth {
  loadUserByEmailRepository?: any;
  updateAccessTokenRepository?: any;
  encrypter?: any;
  tokenGenerator?: any;
}

export class AuthUseCase {
  constructor(private authParams?: Auth) {}

  async auth(email?: string, password?: string) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }

    const user = await this.authParams?.loadUserByEmailRepository.load(email);
    const isValid =
      user &&
      (await this.authParams?.encrypter.compare(password, user.password));
    if (isValid) {
      const accessToken = await this.authParams?.tokenGenerator.generate(
        user.id
      );
      await this.authParams?.updateAccessTokenRepository.update(
        user.id,
        accessToken
      );
      return accessToken;
    }
    return null;
  }
}
