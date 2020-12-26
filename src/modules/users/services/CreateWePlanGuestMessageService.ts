import { injectable, inject } from 'tsyringe';

import UserConfirmation from '@modules/users/infra/typeorm/entities/UserConfirmation';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import AppError from '@shared/errors/AppError';
import UserFile from '../infra/typeorm/entities/UserFile';
import IUserConfirmationFilesRepository from '../repositories/IUserConfirmationFilesRepository';

interface IRequest {
  sender_id: string;
  receiver_id: string;
  title: string;
  message: string;
  files: UserFile[];
}

@injectable()
class CreateWePlanGuestMessageService {
  constructor(
    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('UserConfirmationFilesRepository')
    private userConfirmationFilesRepository: IUserConfirmationFilesRepository,
  ) {}

  public async execute({
    sender_id,
    receiver_id,
    title,
    message,
    files,
  }: IRequest): Promise<UserConfirmation> {
    try {
      const wePlanGuestMessage = await this.userConfirmationRepository.create({
        sender_id,
        receiver_id,
        title,
        message,
        isConfirmed: false,
      });

      if (files.length > 0) {
        Promise.all([
          files.map(file => {
            return this.userConfirmationFilesRepository.create({
              file_id: file.id,
              user_confirmation_id: wePlanGuestMessage.id,
            });
          }),
        ]);
      }

      return wePlanGuestMessage;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

export default CreateWePlanGuestMessageService;
