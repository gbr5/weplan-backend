import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/hashProviders/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update own profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Robert Doe',
      email: 'robert@doe.com',
    });

    await expect(updatedUser.name).toBe('Robert Doe');
    await expect(updatedUser.email).toBe('robert@doe.com');
  });

  it('should not be able to update profile form non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Robert Doe',
        email: 'robert@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update email with one already registered to another account', async () => {
    await fakeUsersRepository.create({
      name: 'Roby Doe',
      email: 'roby@doe.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Robert Doe',
        email: 'roby@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update own password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Robert Doe',
      email: 'robert@doe.com',
      old_password: '123456',
      password: '123123',
    });

    await expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Robert Doe',
        email: 'robert@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password if old password is incorrect', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Robert Doe',
        email: 'robert@doe.com',
        old_password: 'incorrect-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
