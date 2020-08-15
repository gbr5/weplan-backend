import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListSuppliersService from '@modules/appointments/services/ListSuppliersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listSuppliers: ListSuppliersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListSuppliers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listSuppliers = new ListSuppliersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show the suppliers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Bob Doe',
      email: 'bob@doe.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jim Doe',
      email: 'jim@doe.com',
      password: '123456',
    });

    const providers = await listSuppliers.execute({
      user_id: loggedUser.id,
    });

    await expect(providers).toEqual([user1, user2]);
  });
});
