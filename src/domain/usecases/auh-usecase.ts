import { InvalidParamError, MissingParamError } from '../../utils/errors';

export class AuthUseCase {
  constructor(
    private loadUserByEmailRepository?: any,
    private encrypter?: any,
    private tokenGenerator?: any
  ) {}

  async auth(email?: string, password?: string) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }

    const user = await this.loadUserByEmailRepository.load(email);
    const isValid =
      user && (await this.encrypter.compare(password, user.password));
    if (isValid) {
      const accessToken = await this.tokenGenerator.generate(user.id);
      return accessToken;
    }
    return null;
  }
}
