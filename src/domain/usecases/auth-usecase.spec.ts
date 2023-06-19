import { InvalidParamError, MissingParamError } from '../../utils/errors';

class AuthUseCase {
  constructor(private loadUserByEmailRepository?: any) {}
  async auth(email?: string, password?: string) {
    if (!email) {
      throw new MissingParamError('email');
    }
    if (!password) {
      throw new MissingParamError('password');
    }
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository');
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('loadUserByEmailRepository');
    }
    const user = await this.loadUserByEmailRepository.load(email);
    if (!user) {
      return null;
    }
  }
}

const makeSut = () => {
  class LoadUserByEmailRepositorySpy {
    email!: string;
    async load(email: string) {
      this.email = email;
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy);

  return {
    sut,
    loadUserByEmailRepositorySpy,
  };
};

describe('Auth UseCase', () => {
  it('should throw if no email is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.auth();
    expect(promise).rejects.toThrow(new MissingParamError('email'));
  });

  it('should throw if no password is provided', async () => {
    const { sut } = makeSut();
    const promise = sut.auth('any_email@mail.com');
    expect(promise).rejects.toThrow(new MissingParamError('password'));
  });

  it('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    sut.auth('any_email@mail.com', 'any_password');
    expect(loadUserByEmailRepositorySpy.email).toBe('any_email@mail.com');
  });

  it('should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow(
      new MissingParamError('loadUserByEmailRepository')
    );
  });

  it('should throw if LoadUserByEmailRepository has no load method', async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow(
      new InvalidParamError('loadUserByEmailRepository')
    );
  });

  it('should return null if LoadUserByEmailRepository returns null', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(
      'invalid_email@mail.com',
      'any_password'
    );
    expect(accessToken).toBeNull();
  });
});
