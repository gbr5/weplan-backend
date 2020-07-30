import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same email', async () => {
    await createUser.execute({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Bob Doe',
        email: 'bob@doe.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
