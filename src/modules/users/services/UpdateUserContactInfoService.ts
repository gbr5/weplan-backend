import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserContactInfosRepository from '@modules/users/repositories/IUserContactInfosRepository';

import UserContactInfo from '@modules/users/infra/typeorm/entities/UserContactInfo';

interface IRequest {
  contact_info: string;
  id: string;
}
@injectable()
class UpdateUserContactInfoService {
  constructor(
    @inject('UserContactInfosRepository')
    private userContactInfosRepository: IUserContactInfosRepository,
  ) {}

  public async execute({
    contact_info,
    id,
  }: IRequest): Promise<UserContactInfo> {
    const userContactInfo = await this.userContactInfosRepository.findById(id);

    if (!userContactInfo) {
      throw new AppError('UserContact information not found.');
    }

    if (
      userContactInfo.contact_type === 'Website' ||
      userContactInfo.contact_type === 'Instagram' ||
      userContactInfo.contact_type === 'Facebook' ||
      userContactInfo.contact_type === 'Linkedin' ||
      userContactInfo.contact_type === 'Twitter'
    ) {
      const completeUrl = contact_info.includes('https://');

      if (!completeUrl) {
        const completeContactInfo = `https://${contact_info}`;

        userContactInfo.contact_info = completeContactInfo;

        const updatedUserContact_info = await this.userContactInfosRepository.save(
          userContactInfo,
        );

        return updatedUserContact_info;
      }
    }

    userContactInfo.contact_info = contact_info;

    const updatedUserContact_info = await this.userContactInfosRepository.save(
      userContactInfo,
    );

    return updatedUserContact_info;
  }
}

export default UpdateUserContactInfoService;
