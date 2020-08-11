import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserContactInfosRepository from '@modules/users/repositories/IUserContactInfosRepository';

import UserContactInfo from '@modules/users/infra/typeorm/entities/UserContactInfo';

@injectable()
class ShowUserContactInfoService {
  constructor(
    @inject('UserContactInfosRepository')
    private userContactInfosRepository: IUserContactInfosRepository,
  ) {}

  public async execute(
    user_id: string,
    contact_type: string,
  ): Promise<UserContactInfo> {
    const userContactInfo = await this.userContactInfosRepository.findByUserIdAndContactType(
      user_id,
      contact_type,
    );

    if (!userContactInfo) {
      throw new AppError('UserContact information not found.');
    }

    return userContactInfo;
  }
}

export default ShowUserContactInfoService;
