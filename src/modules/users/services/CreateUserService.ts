import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/User';
import IFriendGroupsRepository from '../repositories/IFriendGroupsRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  isCompany: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('FriendGroupsRepository')
    private friendGroupsRepository: IFriendGroupsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    isCompany,
  }: IRequest): Promise<User> {
    const checkUserExits = await this.usersRepository.findByEmail(email);

    if (checkUserExits) {
      throw new AppError(
        'This e-mail is already registered to another account!',
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const userName = name
      .toLowerCase()
      .normalize('NFD')
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ');

    const trimmed_name = name
      .normalize('NFD')
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');

    const user = await this.usersRepository.create({
      name: userName,
      trimmed_name,
      email,
      password: hashedPassword,
      isCompany,
    });

    await this.friendGroupsRepository.create({
      name: 'All',
      user_id: user.id,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
