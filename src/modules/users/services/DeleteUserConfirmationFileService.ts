import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserConfirmationFilesRepository from '@modules/users/repositories/IUserConfirmationFilesRepository';

@injectable()
class DeleteUserConfirmationFileService {
  constructor(
    @inject('UserConfirmationFilesRepository')
    private userConfirmationFilesRepository: IUserConfirmationFilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const userConfirmationFile = await this.userConfirmationFilesRepository.findById(
      id,
    );

    if (!userConfirmationFile) {
      throw new AppError('No confirmation found.');
    }

    await this.userConfirmationFilesRepository.delete(userConfirmationFile);
  }
}

export default DeleteUserConfirmationFileService;
