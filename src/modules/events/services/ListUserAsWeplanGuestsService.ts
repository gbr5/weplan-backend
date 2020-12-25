import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import Guest from '../infra/typeorm/entities/Guest';
import IGuestsRepository from '../repositories/IGuestsRepository';

@injectable()
class ListWeplanGuestsService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute(user_id: string): Promise<Guest[]> {
    const weplanGuests = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );

    const invitedAsGuest = weplanGuests.filter(
      guest => guest.userConfirmations.length > 0,
    );

    const guestIds = invitedAsGuest.map(guest => guest.guest_id);

    const guests = await this.guestsRepository.findByIDs(guestIds);

    return guests;
  }
}

export default ListWeplanGuestsService;
