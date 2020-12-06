import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';
import UserFile from '@modules/users/infra/typeorm/entities/UserFile';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICreateUserFileDTO from '../dtos/ICreateUserFileDTO';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserFileService {
  constructor(
    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    file_name,
    url,
  }: ICreateUserFileDTO): Promise<UserFile> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found!');
    }

    const fileExists = await this.userFilesRepository.findByUserIdAndFileName(
      user_id,
      file_name,
    );

    if (fileExists) {
      throw new AppError('This file name is already beeing used!');
    }
    const fileName = await this.storageProvider.saveFile(url);

    const file = await this.userFilesRepository.create({
      user_id,
      file_name,
      description: file_name,
      url: fileName,
    });

    return file;
  }
}

export default CreateUserFileService;
