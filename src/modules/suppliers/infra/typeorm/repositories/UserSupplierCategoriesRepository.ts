import { getRepository, Repository } from 'typeorm';

import IUserSupplierCategoriesRepository from '@modules/suppliers/repositories/IUserSupplierCategoriesRepository';
import ICreateUserSupplierCategoryDTO from '@modules/suppliers/dtos/ICreateUserSupplierCategoryDTO';

import UserSupplierCategory from '@modules/suppliers/infra/typeorm/entities/UserSupplierCategory';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  sub_category_name: string;
}

class UserSupplierCategoryRepository
  implements IUserSupplierCategoriesRepository {
  private ormRepository: Repository<UserSupplierCategory>;

  constructor() {
    this.ormRepository = getRepository(UserSupplierCategory);
  }

  public async findByCategory(
    sub_category_name: string,
  ): Promise<UserSupplierCategory[]> {
    const findUserSupplierCategory = await this.ormRepository.find({
      where: { sub_category_name },
    });

    return findUserSupplierCategory;
  }

  public async findByIdAndCategory(
    user_id: string,
    sub_category_name: string,
  ): Promise<UserSupplierCategory | undefined> {
    try {
      const findUserSupplierCategory = await this.ormRepository.findOne({
        where: {
          user_id,
          sub_category_name,
        },
      });
      return findUserSupplierCategory;
    } catch (err) {
      return undefined;
    }
  }

  public async create({
    user_id,
    sub_category_name,
  }: ICreateUserSupplierCategoryDTO): Promise<UserSupplierCategory> {
    try {
      const userSupplierCategory = this.ormRepository.create({
        user_id,
        sub_category_name,
      });

      await this.ormRepository.save(userSupplierCategory);

      return userSupplierCategory;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserSupplierCategoryRepository.create',
      );
    }
  }

  public async save(
    event: UserSupplierCategory,
  ): Promise<UserSupplierCategory> {
    try {
      return this.ormRepository.save(event);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserSupplierCategoryRepository.save',
      );
    }
  }

  public async delete({ user_id, sub_category_name }: IRequest): Promise<void> {
    try {
      await this.ormRepository.delete({
        user_id,
        sub_category_name,
      });
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserSupplierCategoryRepository.delete',
      );
    }
  }
}

export default UserSupplierCategoryRepository;
