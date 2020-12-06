import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';

import UserFile from '@modules/users/infra/typeorm/entities/UserFile';

interface IRequest {
  id: string;
  file_name: string;
  description: string;
}
@injectable()
class UpdateUserFileService {
  constructor(
    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute({
    id,
    file_name,
    description,
  }: IRequest): Promise<UserFile> {
    const userfile = await this.userFilesRepository.findById(id);

    if (!userfile) {
      throw new AppError('File not found.');
    }

    userfile.file_name = file_name;
    userfile.description = description;

    const updatedUserFile = await this.userFilesRepository.save(userfile);

    return updatedUserFile;
  }
}

export default UpdateUserFileService;
