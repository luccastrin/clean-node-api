import { MissingParamError } from '../../utils/errors';
import { AuthUseCase } from './auh-usecase';

const makeEncrypter = () => {
  class EncrypterSpy {
    password!: string;
    hashedPassword!: string;
    isValid!: boolean;

    async compare(password: string, hashedPassword: string) {
      this.password = password;
      this.hashedPassword = hashedPassword;
      return this.isValid;
    }
  }
  const encrypterSpy = new EncrypterSpy();
  encrypterSpy.isValid = true;
  return encrypterSpy;
};

const makeEncrypterWithError = () => {
  class EncrypterSpy {
    async compare() {
      throw new Error();
    }
  }
  return new EncrypterSpy();
};

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    userId!: string;
    accessToken!: string;

    async generate(userId: string) {
      this.userId = userId;
      return this.accessToken;
    }
  }
  const tokenGeneratorSpy = new TokenGeneratorSpy();
  tokenGeneratorSpy.accessToken = 'any_token';
  return tokenGeneratorSpy;
};

const makeTokenGeneratorWithError = () => {
  class TokenGeneratorSpy {
    async generate() {
      throw new Error();
    }
  }
  return new TokenGeneratorSpy();
};

const makeLoadUserEmailRepository = () => {
  class LoadUserByEmailRepositorySpy {
    email!: string;
    user!: any;
    async load(email: string) {
      this.email = email;
      return this.user;
    }
  }
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  loadUserByEmailRepositorySpy.user = {
    id: 'any_id',
    password: 'hashed_password',
  };
  return loadUserByEmailRepositorySpy;
};

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepositorySpy {
    userId!: string;
    accessToken!: string;

    async update(userId: string, accessToken: string) {
      this.userId = userId;
      this.accessToken = accessToken;
    }
  }
  return new UpdateAccessTokenRepositorySpy();
};

const makeLoadUserEmailRepositoryWithError = () => {
  class LoadUserByEmailRepositorySpy {
    async load() {
      throw new Error();
    }
  }
  return new LoadUserByEmailRepositorySpy();
};

const makeSut = () => {
  const encrypterSpy = makeEncrypter();
  const loadUserByEmailRepositorySpy = makeLoadUserEmailRepository();
  const tokenGeneratorSpy = makeTokenGenerator();
  const updateAccessTokenRepositorySpy = makeUpdateAccessTokenRepository();
  const sut = new AuthUseCase({
    loadUserByEmailRepository: loadUserByEmailRepositorySpy,
    encrypter: encrypterSpy,
    tokenGenerator: tokenGeneratorSpy,
    updateAccessTokenRepository: updateAccessTokenRepositorySpy,
  });

  return {
    sut,
    loadUserByEmailRepositorySpy,
    encrypterSpy,
    tokenGeneratorSpy,
    updateAccessTokenRepositorySpy,
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

  it('should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.user = null;
    const accessToken = await sut.auth(
      'invalid_email@mail.com',
      'any_password'
    );
    expect(accessToken).toBeNull();
  });

  it('should return null if an invalid password is provided', async () => {
    const { sut, encrypterSpy } = makeSut();
    encrypterSpy.isValid = false;
    const accessToken = await sut.auth(
      'valid_email@mail.com',
      'invalid_password'
    );
    expect(accessToken).toBeNull();
  });

  it('should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encrypterSpy } = makeSut();
    await sut.auth('valid_email@mail.com', 'any_password');
    expect(encrypterSpy.password).toBe('any_password');
    expect(encrypterSpy.hashedPassword).toBe(
      loadUserByEmailRepositorySpy.user.password
    );
  });

  it('should call TokenGenerator with correct userId', async () => {
    const { sut, loadUserByEmailRepositorySpy, tokenGeneratorSpy } = makeSut();
    await sut.auth('valid_email@mail.com', 'valid_password');
    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id);
  });

  it('should return an accessToken if correct credentials are provided', async () => {
    const { sut, tokenGeneratorSpy } = makeSut();
    const accessToken = await sut.auth(
      'valid_email@mail.com',
      'valid_password'
    );
    expect(accessToken).toBe(tokenGeneratorSpy.accessToken);
    expect(accessToken).toBeTruthy();
  });

  it('should throw if no LoadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase({});
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const {
      sut,
      loadUserByEmailRepositorySpy,
      updateAccessTokenRepositorySpy,
      tokenGeneratorSpy,
    } = makeSut();
    await sut.auth('valid_email@mail.com', 'valid_password');
    expect(updateAccessTokenRepositorySpy.userId).toBe(
      loadUserByEmailRepositorySpy.user.id
    );
    expect(updateAccessTokenRepositorySpy.accessToken).toBe(
      tokenGeneratorSpy.accessToken
    );
  });

  it('should throw if LoadUserByEmailRepository has no load method', async () => {
    const invalid = {};
    const sut = new AuthUseCase({ loadUserByEmailRepository: invalid });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if encrypter is null', async () => {
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepository(),
      encrypter: null,
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if encrypter is invalid', async () => {
    const invalid = {};
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepository(),
      encrypter: invalid,
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if tokenGenerator is null', async () => {
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepository(),
      encrypter: makeEncrypter(),
      tokenGenerator: null,
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if tokenGenerator is invalid', async () => {
    const invalid = {};
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepository(),
      encrypter: makeEncrypter(),
      tokenGenerator: invalid,
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if loadUserByEmailRepository throws', async () => {
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepositoryWithError(),
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if encrypter throws', async () => {
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepository(),
      encrypter: makeEncrypterWithError(),
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });

  it('should throw if tokenGenerator throws', async () => {
    const sut = new AuthUseCase({
      loadUserByEmailRepository: makeLoadUserEmailRepositoryWithError(),
      encrypter: makeEncrypter(),
      tokenGenerator: makeTokenGeneratorWithError(),
    });
    const promise = sut.auth('any_email@mail.com', 'any_password');
    expect(promise).rejects.toThrow();
  });
});
