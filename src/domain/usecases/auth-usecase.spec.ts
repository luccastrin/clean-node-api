class AuthUseCase {
  async auth(email?: string) {
    if (!email) throw new Error('');
  }
}

describe('Auth UseCase', () => {
  it('should throw if no email is provided', async () => {
    const sut = new AuthUseCase();
    const promise = sut.auth();
    expect(promise).rejects.toThrow();
  });
});