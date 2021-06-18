import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';
import GuestContact from '../infra/typeorm/entities/GuestContact';

@injectable()
class ListGuestContactsService {
  constructor(
    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,
  ) {}

  public async execute(guest_id: string): Promise<GuestContact[]> {
    const guestContacts = await this.guestContactsRepository.findByGuest(
      guest_id,
    );

    return guestContacts;
  }
}

export default ListGuestContactsService;
