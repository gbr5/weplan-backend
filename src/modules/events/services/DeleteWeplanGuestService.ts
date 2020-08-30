import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';

@injectable()
class DeleteWeplanGuestService {
  constructor(
    @inject('WeplanGuestsRepository')
    private guestsRepository: IWeplanGuestsRepository,
  ) {}

  public async execute(guest_id: string): Promise<void> {
    const guest = await this.guestsRepository.findByGuestId(guest_id);

    if (!guest) {
      throw new AppError('WeplanGuest not found.');
    }

    await this.guestsRepository.delete(guest);
  }
}

export default DeleteWeplanGuestService;
