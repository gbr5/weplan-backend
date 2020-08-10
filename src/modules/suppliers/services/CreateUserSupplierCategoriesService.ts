import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserSupplierCategory from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';
import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  sub_category_name: string;
}

@injectable()
class CreateUserSupplierCategoryService {
  constructor(
    @inject('UserSupplierCategoriesRepository')
    private userSupplierCategoriesRepository: IUserSupplierCategoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    sub_category_name,
  }: IRequest): Promise<UserSupplierCategory> {
    try {
      const userSupplierCategoryExists = await this.userSupplierCategoriesRepository.findByIdAndCategory(
        user_id,
        sub_category_name,
      );

      if (userSupplierCategoryExists) {
        throw new AppError(
          `${user_id} is already registered to ${sub_category_name}.`,
        );
      }

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found');
      }

      const userSupplierCategory = await this.userSupplierCategoriesRepository.create(
        {
          user_id,
          sub_category_name,
        },
      );

      await this.notificationsRepository.create({
        recipient_id: user_id,
        content: `${user_id} was successfully registered for ${sub_category_name}.`,
      });

      return userSupplierCategory;
    } catch (err) {
      throw new AppError(
        'Somthing went wrong - CreateUserSupplierCategoryService',
      );
    }
  }
}

export default CreateUserSupplierCategoryService;
