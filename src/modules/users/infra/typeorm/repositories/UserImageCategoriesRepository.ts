import { getRepository, Repository } from 'typeorm';

import IUserImageCategoriesRepository from '@modules/users/repositories/IUserImageCategoriesRepository';
import ICreateUserImageCategoryDTO from '@modules/users/dtos/ICreateUserImageCategoryDTO';

import UserImageCategory from '@modules/users/infra/typeorm/entities/UserImageCategory';
import AppError from '@shared/errors/AppError';

class UserImageCategoriesRepository implements IUserImageCategoriesRepository {
  private ormRepository: Repository<UserImageCategory>;

  constructor() {
    this.ormRepository = getRepository(UserImageCategory);
  }

  public async findByUserId(user_id: string): Promise<UserImageCategory[]> {
    const findUserImageCategory = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserImageCategory;
  }

  public async findByUserIdAndName(
    user_id: string,
    name: string,
  ): Promise<UserImageCategory | undefined> {
    const findUserImageCategory = await this.ormRepository.findOne({
      where: { user_id, name },
    });

    return findUserImageCategory;
  }

  public async findById(id: string): Promise<UserImageCategory | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(
    data: ICreateUserImageCategoryDTO,
  ): Promise<UserImageCategory> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserImageCategoriesRepository.create',
      );
    }
  }

  public async save(data: UserImageCategory): Promise<UserImageCategory> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, UserImageCategoriesRepository.save');
    }
  }

  public async delete(data: UserImageCategory): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default UserImageCategoriesRepository;
