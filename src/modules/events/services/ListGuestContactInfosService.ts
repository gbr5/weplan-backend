import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IGuestContactInfosRepository from '@modules/events/repositories/IGuestContactInfosRepository';
import GuestContactInfo from '../infra/typeorm/entities/GuestContactInfo';

@injectable()
class ListGuestContactInfosService {
  constructor(
    @inject('GuestContactInfosRepository')
    private guestContactInfosRepository: IGuestContactInfosRepository,
  ) {}

  public async execute(guest_id: string): Promise<GuestContactInfo[]> {
    const guestContactInfos = await this.guestContactInfosRepository.findByGuest(
      guest_id,
    );

    return guestContactInfos;
  }
}

export default ListGuestContactInfosService;
