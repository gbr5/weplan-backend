import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';
import GuestContact from '@modules/events/infra/typeorm/entities/GuestContact';

interface IRequest {
  id: string;
  contact_info: string;
}
@injectable()
class UpdateGuestContactService {
  constructor(
    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,
  ) {}

  public async execute({ id, contact_info }: IRequest): Promise<GuestContact> {
    const guestContact = await this.guestContactsRepository.findById(id);

    if (!guestContact) {
      throw new AppError('GuestContact not found.');
    }

    guestContact.contact_info = contact_info;

    const updatedGuestContact = await this.guestContactsRepository.save(
      guestContact,
    );

    return updatedGuestContact;
  }
}

export default UpdateGuestContactService;
