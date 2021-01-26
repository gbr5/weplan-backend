import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserImageCategoriesRepository from '@modules/users/repositories/IUserImageCategoriesRepository';
import UserImageCategory from '@modules/users/infra/typeorm/entities/UserImageCategory';
import ICreateUserImageCategoryDTO from '../dtos/ICreateUserImageCategoryDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserImageCategoryService {
  constructor(
    @inject('UserImageCategoriesRepository')
    private userImageCategoriesRepository: IUserImageCategoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    description,
    color,
  }: ICreateUserImageCategoryDTO): Promise<UserImageCategory> {
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

    const categoryExists = await this.userImageCategoriesRepository.findByUserIdAndName(
      user_id,
      name,
    );

    if (categoryExists) {
      throw new AppError(
        'This name is already registered to another category!',
      );
    }

    const friendGroup = await this.userImageCategoriesRepository.create({
      user_id,
      name,
      description,
      color,
    });

    return friendGroup;
  }
}

export default CreateUserImageCategoryService;
