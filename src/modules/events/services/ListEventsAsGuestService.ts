import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
class ListEventsAsGuestService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(user_id: string): Promise<Event[]> {
    const weplanGuests = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );

    const invitedAsGuest = weplanGuests.filter(
      guest => guest.userConfirmations.length > 0,
    );
    const eventIds = invitedAsGuest.map(guest => guest.event_id);

    const eventsAsWeplanGuest = await this.eventsRepository.findAllByIds(
      eventIds,
    );

    return eventsAsWeplanGuest;
  }
}

export default ListEventsAsGuestService;