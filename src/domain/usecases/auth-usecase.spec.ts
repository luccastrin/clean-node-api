import { MissingParamError } from '../../utils/errors';

class AuthUseCase {
  constructor(private loadUserByEmailRepository?: any) {}
  async auth(email?: string, password?: string) {
    if (!email) throw new MissingParamError('email');
    if (!password) throw new MissingParamError('password');
    await this.loadUserByEmailRepository.load(email);
  }
}

describe('Auth UseCase', () => {
  it('should throw if no email is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('should throw if no password is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('any_email@mail.com');
    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });

  it('should call LoadUserByEmailRepository with correct email', async () => {
    class LoadUserByEmailRepositorySpy {
      email!: string;
      async load(email: string) {
        this.email = email;
      }
    }
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    const sut = new AuthUseCase(loadUserByEmailRepositorySpy);
    sut.auth('any_email@mail.com', 'any_password');
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com');
  });
});
