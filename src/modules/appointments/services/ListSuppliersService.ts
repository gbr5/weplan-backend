import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
}
@injectable()
class ListSuppliersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `suppliers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllSuppliers({
        except_user_id: user_id,
      });

      await this.cacheProvider.save(
        `suppliers-list:${user_id}`,
        classToClass(users),
      );
    }

    return classToClass(users);
  }
}

export default ListSuppliersService;
