import { getRepository, Repository } from 'typeorm';

import IUserConfirmationFilesRepository from '@modules/users/repositories/IUserConfirmationFilesRepository';
import ICreateUserConfirmationFileDTO from '@modules/users/dtos/ICreateUserConfirmationFileDTO';

import UserConfirmationFile from '@modules/users/infra/typeorm/entities/UserConfirmationFile';
import AppError from '@shared/errors/AppError';

class UserConfirmationFilesRepository
  implements IUserConfirmationFilesRepository {
  private ormRepository: Repository<UserConfirmationFile>;

  constructor() {
    this.ormRepository = getRepository(UserConfirmationFile);
  }

  public async findById(id: string): Promise<UserConfirmationFile | undefined> {
    const employee = await this.ormRepository.findOne(id);

    return employee;
  }

  public async create(
    data: ICreateUserConfirmationFileDTO,
  ): Promise<UserConfirmationFile> {
    try {
      const userConfirmation = this.ormRepository.create(data);

      await this.ormRepository.save(userConfirmation);

      return userConfirmation;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserConfirmationFilesRepository.create',
      );
    }
  }

  public async save(
    employee: UserConfirmationFile,
  ): Promise<UserConfirmationFile> {
    try {
      return this.ormRepository.save(employee);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserConfirmationFilesRepository.save',
      );
    }
  }

  public async delete(employee: UserConfirmationFile): Promise<void> {
    try {
      await this.ormRepository.delete(employee.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, UserConfirmationFilesRepository.delete',
      );
    }
  }
}

export default UserConfirmationFilesRepository;
