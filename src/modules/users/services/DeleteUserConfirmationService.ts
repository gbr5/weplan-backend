import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';

@injectable()
class DeleteUserConfirmationService {
  constructor(
    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    try {
      const userConfirmation = await this.userConfirmationRepository.findById(
        id,
      );

      if (!userConfirmation) {
        throw new AppError('No confirmation found.');
      }

      await this.userConfirmationRepository.delete(userConfirmation);
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default DeleteUserConfirmationService;
