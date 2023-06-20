import { InvalidParamError, MissingParamError } from '../../utils/errors';

export class AuthUseCase {
  constructor(private loadUserByEmailRepository?: any) {}
  async auth(email?: string, password?: string) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }
    const user = await this.loadUserByEmailRepository.load(email);
    if (!user) {
      return null;
    }
    return null;
  }
}
