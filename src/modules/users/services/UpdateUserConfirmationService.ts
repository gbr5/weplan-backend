import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';

interface IRequest {
  id: string;
  title: string;
  message: string;
  isConfirmed: boolean;
}

@injectable()
class UpdateUserConfirmationService {
  constructor(
    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,
  ) {}

  public async execute({
    id,
    title,
    message,
    isConfirmed,
  }: IRequest): Promise<UserConfirmation> {
    const userConfirmation = await this.userConfirmationRepository.findById(id);

    if (!userConfirmation) {
      throw new AppError('UserConfirmation not found.');
    }
    userConfirmation.title = title;
    userConfirmation.message = message;
    userConfirmation.isConfirmed = isConfirmed;

    const updatedUserConfirmation = await this.userConfirmationRepository.save(
      userConfirmation,
    );

    return updatedUserConfirmation;
  }
}

export default UpdateUserConfirmationService;
