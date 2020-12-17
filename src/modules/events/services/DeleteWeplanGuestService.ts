import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import IGuestsRepository from '../repositories/IGuestsRepository';

@injectable()
class DeleteWeplanGuestService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const weplanGuest = await this.weplanGuestsRepository.findById(id);

    if (!weplanGuest) {
      throw new AppError('WeplanGuest not found.');
    }

    const guest = await this.guestsRepository.findByGuestId(
      weplanGuest.guest_id,
    );

    if (!guest) {
      throw new AppError('Guest not found.');
    }
    guest.weplanUser = false;

    const updatedGuest = await this.guestsRepository.save(guest);

    if (updatedGuest.weplanUser) {
      throw new AppError(
        'Unable to update guest, something went wrong Guy!! Go back and make it right!',
      );
    }
    await this.weplanGuestsRepository.delete(weplanGuest);
  }
}

export default DeleteWeplanGuestService;
