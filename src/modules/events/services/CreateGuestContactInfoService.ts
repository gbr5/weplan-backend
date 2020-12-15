import { injectable, inject } from 'tsyringe';

import GuestContactInfo from '@modules/events/infra/typeorm/entities/GuestContactInfo';
import IGuestContactInfosRepository from '@modules/events/repositories/IGuestContactInfosRepository';
import ICreateGuestContactInfoDTO from '../dtos/ICreateGuestContactInfoDTO';

@injectable()
class CreateGuestContactInfoService {
  constructor(
    @inject('GuestContactInfosRepository')
    private guestContactInfosRepository: IGuestContactInfosRepository,
  ) {}

  public async execute({
    contact_info,
    contact_type_id,
    guest_id,
  }: ICreateGuestContactInfoDTO): Promise<GuestContactInfo> {
    const guestContactInfo = await this.guestContactInfosRepository.create({
      contact_info,
      contact_type_id,
      guest_id,
    });

    return guestContactInfo;
  }
}

export default CreateGuestContactInfoService;
