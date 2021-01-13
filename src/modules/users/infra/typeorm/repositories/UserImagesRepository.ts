import { getRepository, Repository } from 'typeorm';

import IUserImagesRepository from '@modules/users/repositories/IUserImagesRepository';
import ICreateUserImageDTO from '@modules/users/dtos/ICreateUserImageDTO';

import UserImage from '@modules/users/infra/typeorm/entities/UserImage';
import AppError from '@shared/errors/AppError';

class UserImagesRepository implements IUserImagesRepository {
  private ormRepository: Repository<UserImage>;

  constructor() {
    this.ormRepository = getRepository(UserImage);
  }

  public async findByUserId(user_id: string): Promise<UserImage[]> {
    const findUserImage = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserImage;
  }

  public async findByUserIdAndImageName(
    user_id: string,
    name: string,
  ): Promise<UserImage | undefined> {
    const findUserImage = await this.ormRepository.findOne({
      where: { user_id, name },
    });

    return findUserImage;
  }

  public async findById(id: string): Promise<UserImage | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateUserImageDTO): Promise<UserImage> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, UserImagesRepository.create');
    }
  }

  public async save(data: UserImage): Promise<UserImage> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, UserImagesRepository.save');
    }
  }

  public async delete(data: UserImage): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default UserImagesRepository;
