import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserFilesRepository from '@modules/users/repositories/IUserFilesRepository';

@injectable()
class DeleteUserFileService {
  constructor(
    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userFile = await this.userFilesRepository.findById(id);

    if (!userFile) {
      throw new AppError('No confirmation found.');
    }

    await this.userFilesRepository.delete(userFile);
  }
}

export default DeleteUserFileService;
