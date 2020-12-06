import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFileCategoriesRepository from '@modules/users/repositories/IUserFileCategoriesRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import UserFileCategory from '@modules/users/infra/typeorm/entities/UserFileCategory';
import ICreateUserFileCategoryDTO from '../dtos/ICreateUserFileCategoryDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserFileCategoryService {
  constructor(
    @inject('UserFileCategoriesRepository')
    private userFileCategoriesRepository: IUserFileCategoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    name,
    description,
    color,
  }: ICreateUserFileCategoryDTO): Promise<UserFileCategory> {
    if (
      name === 'Card' ||
      name === 'Friends' ||
      name === 'Budget' ||
      name === 'Contract' ||
      name === 'Contact' ||
      name === 'Employee'
    ) {
      throw new AppError('This name is already registered to another group!');
    }

    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found!');
    }

    const categoryExists = await this.userFileCategoriesRepository.findByUserIdAndName(
      user_id,
      name,
    );

    if (categoryExists) {
      throw new AppError(
        'This name is already registered to another category!',
      );
    }

    const friendGroup = await this.userFileCategoriesRepository.create({
      user_id,
      name,
      description,
      color,
    });

    return friendGroup;
  }
}

export default CreateUserFileCategoryService;
