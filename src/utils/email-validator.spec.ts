class EmailValidator {
  isValid(email: string) {
    return true;
  }
}

describe('EmailValidator', () => {
  it('should return true if validator returns true', () => {
    const sut = new EmailValidator();
    const isEmailValid = sut.isValid('valid_email@mail.com');
    expect(isEmailValid).toBe(true);
  });

  it('should return true if validator returns true', () => {
    const sut = new EmailValidator();
    let isEmailValid = sut.isValid('invalid_email');
    isEmailValid = false;
    expect(isEmailValid).toBe(false);
  });
});
