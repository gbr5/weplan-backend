import { injectable, inject } from 'tsyringe';

import GuestContact from '@modules/events/infra/typeorm/entities/GuestContact';
import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';
import ICreateGuestContactDTO from '../dtos/ICreateGuestContactDTO';

@injectable()
class CreateGuestContactService {
  constructor(
    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,
  ) {}

  public async execute({
    contact_info,
    contact_type,
    guest_id,
  }: ICreateGuestContactDTO): Promise<GuestContact> {
    const guestContact = await this.guestContactsRepository.create({
      contact_info,
      contact_type,
      guest_id,
    });

    return guestContact;
  }
}

export default CreateGuestContactService;
