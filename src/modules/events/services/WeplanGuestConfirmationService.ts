import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IWeplanGuestsRepository from '../repositories/IWeplanGuestsRepository';

interface IRequest {
  id: string;
  user_id: string;
}
@injectable()
class WeplanGuestConfirmationService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,
  ) {}

  public async execute({ id, user_id }: IRequest): Promise<Guest> {
    const guest = await this.guestsRepository.findByGuestId(id);

    if (!guest) {
      throw new AppError('Guest not found.');
    }
    const weplanGuest = await this.weplanGuestsRepository.findByEventAndUserId(
      guest.event_id,
      user_id,
    );

    if (!weplanGuest || weplanGuest.guest_id !== guest.id) {
      throw new AppError('Guest not found.');
    }

    guest.confirmed = !guest.confirmed;

    const updatedGuest = await this.guestsRepository.save(guest);

    return updatedGuest;
  }
}

export default WeplanGuestConfirmationService;
