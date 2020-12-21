import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import UserConfirmationFile from '@modules/users/infra/typeorm/entities/UserConfirmationFile';
import IUserConfirmationFilesRepository from '@modules/users/repositories/IUserConfirmationFilesRepository';
import ICreateUserConfirmationFileDTO from '../dtos/ICreateUserConfirmationFileDTO';
import IUserFilesRepository from '../repositories/IUserFilesRepository';
import IUserConfirmationRepository from '../repositories/IUserConfirmationRepository';

@injectable()
class CreateUserConfirmationFileService {
  constructor(
    @inject('UserFilesRepository')
    private userFilesRepository: IUserFilesRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('UserConfirmationFilesRepository')
    private userConfirmationFilesRepository: IUserConfirmationFilesRepository,
  ) {}

  public async execute({
    file_id,
    user_confirmation_id,
  }: ICreateUserConfirmationFileDTO): Promise<
    UserConfirmationFile | undefined
  > {
    const userFile = await this.userFilesRepository.findById(file_id);

    if (!userFile) {
      throw new AppError('File not found!');
    }

    const userConfirmation = await this.userConfirmationRepository.findById(
      user_confirmation_id,
    );

    if (!userConfirmation) {
      throw new AppError('Confirmation not found!');
    }

    const userConfirmationFile = await this.userConfirmationFilesRepository.create(
      {
        file_id,
        user_confirmation_id,
      },
    );

    return userConfirmationFile;
  }
}

export default CreateUserConfirmationFileService;
