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
class UpdateUserContactInfoService {
  constructor(
    @inject('UserContactInfosRepository')
    private userContactInfosRepository: IUserContactInfosRepository,
  ) {}

  public async execute({
    contact_info,
    contact_type,
    user_id,
  }: IRequest): Promise<UserContactInfo> {
    const userContactInfo = await this.userContactInfosRepository.findByUserIdAndContactType(
      user_id,
      contact_type,
    );

    if (!userContactInfo) {
      throw new AppError('UserContact information not found.');
    }

    userContactInfo.contact_info = contact_info;

    const updatedUserContact_info = await this.userContactInfosRepository.save(
      userContactInfo,
    );

    return updatedUserContact_info;
  }
}

export default UpdateUserContactInfoService;
