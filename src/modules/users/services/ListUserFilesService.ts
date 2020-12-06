import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';
import UserFile from '../infra/typeorm/entities/UserFile';

@injectable()
class ListUserFileService {
  constructor(
    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute(user_id: string): Promise<UserFile[]> {
    const userFiles = this.userFilesRepository.findByUserId(user_id);

    return userFiles;
  }
}

export default ListUserFileService;
