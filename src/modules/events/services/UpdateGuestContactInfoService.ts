import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestContactInfosRepository from '@modules/events/repositories/IGuestContactInfosRepository';
import GuestContactInfo from '@modules/events/infra/typeorm/entities/GuestContactInfo';

interface IRequest {
  id: string;
  contact_info: string;
}
@injectable()
class UpdateGuestContactInfoService {
  constructor(
    @inject('GuestContactInfosRepository')
    private guestContactInfosRepository: IGuestContactInfosRepository,
  ) {}

  public async execute({
    id,
    contact_info,
  }: IRequest): Promise<GuestContactInfo> {
    const guestContactInfo = await this.guestContactInfosRepository.findById(
      id,
    );

    if (!guestContactInfo) {
      throw new AppError('GuestContactInfo not found.');
    }

    guestContactInfo.contact_info = contact_info;

    const updatedGuestContactInfo = await this.guestContactInfosRepository.save(
      guestContactInfo,
    );

    return updatedGuestContactInfo;
  }
}

export default UpdateGuestContactInfoService;
