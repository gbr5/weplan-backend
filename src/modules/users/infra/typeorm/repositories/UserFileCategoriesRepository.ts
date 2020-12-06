import { getRepository, Repository } from 'typeorm';

import IUserFileCategoriesRepository from '@modules/users/repositories/IUserFileCategoriesRepository';
import ICreateUserFileCategoryDTO from '@modules/users/dtos/ICreateUserFileCategoryDTO';

import UserFileCategory from '@modules/users/infra/typeorm/entities/UserFileCategory';
import AppError from '@shared/errors/AppError';

class UserFileCategoriesRepository implements IUserFileCategoriesRepository {
  private ormRepository: Repository<UserFileCategory>;

  constructor() {
    this.ormRepository = getRepository(UserFileCategory);
  }

  public async findByUserId(user_id: string): Promise<UserFileCategory[]> {
    const findUserFileCategory = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserFileCategory;
  }

  public async findByUserIdAndName(
    user_id: string,
    name: string,
  ): Promise<UserFileCategory | undefined> {
    const findUserFileCategory = await this.ormRepository.findOne({
      where: { user_id, name },
    });

    return findUserFileCategory;
  }

  public async findById(id: string): Promise<UserFileCategory | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(
    data: ICreateUserFileCategoryDTO,
  ): Promise<UserFileCategory> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserFileCategoriesRepository.create',
      );
    }
  }

  public async save(data: UserFileCategory): Promise<UserFileCategory> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, UserFileCategoriesRepository.save');
    }
  }

  public async delete(data: UserFileCategory): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default UserFileCategoriesRepository;
