import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestContactInfosRepository from '@modules/events/repositories/IGuestContactInfosRepository';

@injectable()
class DeleteGuestContactInfoService {
  constructor(
    @inject('GuestContactInfosRepository')
    private guestContactInfosRepository: IGuestContactInfosRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const guestContactInfo = await this.guestContactInfosRepository.findById(
      id,
    );

    if (!guestContactInfo) {
      throw new AppError('GuestContactInfo not found.');
    }

    await this.guestContactInfosRepository.delete(guestContactInfo);
  }
}

export default DeleteGuestContactInfoService;
