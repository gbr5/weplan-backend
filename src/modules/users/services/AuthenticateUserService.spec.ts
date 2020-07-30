import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(response).toHaveProperty('token');
    await expect(response.user).toBe(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'bob@doe.cm',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'bob@doe.com',
        password: 'sakjckjck',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
