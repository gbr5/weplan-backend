import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';

interface IRequest {
  sender_id: string;
  receiver_id: string;
  title: string;
  message: string;
  isConfirmed: boolean;
}

@injectable()
class CreateUserConfirmation {
  constructor(
    @inject('UserConfirmationRepository')
    private companyEmployeesRepository: IUserConfirmationRepository,
  ) {}

  public async execute({
    sender_id,
    receiver_id,
    title,
    message,
    isConfirmed,
  }: IRequest): Promise<UserConfirmation> {
    try {
      const userConfirmation = await this.companyEmployeesRepository.create({
        sender_id,
        receiver_id,
        title,
        message,
        isConfirmed,
      });

      return userConfirmation;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateUserConfirmation;
