import { getRepository, Repository } from 'typeorm';

import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';
import ICreateUserFileDTO from '@modules/users/dtos/ICreateUserFileDTO';

import UserFile from '@modules/users/infra/typeorm/entities/UserFile';
import AppError from '@shared/errors/AppError';

class UserFilesRepository implements IUserFilesRepository {
  private ormRepository: Repository<UserFile>;

  constructor() {
    this.ormRepository = getRepository(UserFile);
  }

  public async findByUserId(user_id: string): Promise<UserFile[]> {
    const findUserFile = await this.ormRepository.find({
      where: { user_id },
    });

    return findUserFile;
  }

  public async findByUserIdAndFileName(
    user_id: string,
    file_name: string,
  ): Promise<UserFile | undefined> {
    const findUserFile = await this.ormRepository.findOne({
      where: { user_id, file_name },
    });

    return findUserFile;
  }

  public async findById(id: string): Promise<UserFile | undefined> {
    const data = await this.ormRepository.findOne(id);

    return data;
  }

  public async create(data: ICreateUserFileDTO): Promise<UserFile> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError('Algo deu errado, UserFilesRepository.create');
    }
  }

  public async save(data: UserFile): Promise<UserFile> {
    try {
      return this.ormRepository.save(data);
    } catch (err) {
      throw new AppError('Algo deu errado, UserFilesRepository.save');
    }
  }

  public async delete(data: UserFile): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default UserFilesRepository;
