import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestContactsRepository from '@modules/events/repositories/IGuestContactsRepository';

@injectable()
class DeleteGuestContactService {
  constructor(
    @inject('GuestContactsRepository')
    private guestContactsRepository: IGuestContactsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const guestContact = await this.guestContactsRepository.findById(id);

    if (!guestContact) {
      throw new AppError('GuestContact not found.');
    }

    await this.guestContactsRepository.delete(guestContact);
  }
}

export default DeleteGuestContactService;
