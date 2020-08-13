import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserContactInfosRepository from '@modules/users/repositories/IUserContactInfosRepository';
import UserContactInfo from '@modules/users/infra/typeorm/entities/UserContactInfo';

interface IRequest {
  contact_info: string;
  contact_type: string;
  user_id: string;
}

@injectable()
class CreateUserContactInfoService {
  constructor(
    @inject('UserContactInfosRepository')
    private userContactInfosRepository: IUserContactInfosRepository,
  ) {}

  public async execute({
    contact_info,
    contact_type,
    user_id,
  }: IRequest): Promise<UserContactInfo> {
    const checkIfUserContactInfoExists = await this.userContactInfosRepository.findByUserIdAndContactType(
      user_id,
      contact_type,
    );

    if (checkIfUserContactInfoExists) {
      throw new AppError(
        'This user already have a user contact information profile!',
      );
    }

    const userContactInfo = await this.userContactInfosRepository.create({
      contact_info,
      contact_type,
      user_id,
    });

    return userContactInfo;
  }
}

export default CreateUserContactInfoService;
