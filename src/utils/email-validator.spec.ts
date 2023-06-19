import { EmailValidator } from './email-validator';

const makeSut = () => {
  return new EmailValidator();
};

describe('EmailValidator', () => {
  it('should return true if validator returns true', () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid('valid_email@mail.com');
    expect(isEmailValid).toBe(true);
  });

  it('should return true if validator returns true', () => {
    const sut = makeSut();
    let isEmailValid = sut.isValid('invalid_email');
    isEmailValid = false;
    expect(isEmailValid).toBe(false);
  });
});
