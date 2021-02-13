import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';

import IExternalGuestDTO from '../dtos/IExternalGuestDTO';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class ShowExternalGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id: string): Promise<IExternalGuestDTO> {
    const guest = await this.guestsRepository.findByGuestId(id);

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    const event = await this.eventsRepository.findById(guest.event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const avatar = event.getAvatarUrl();

    return {
      address: event.eventInfo.address,
      country: event.eventInfo.country,
      local_state: event.eventInfo.local_state,
      city: event.eventInfo.city,
      dress_code: event.eventInfo.dress_code,
      duration: event.eventInfo.duration,
      name: event.name,
      trimmed_name: event.trimmed_name,
      avatar_url: avatar || '',
      date: event.date,
      description: event.eventInfo.description,
      event_type: event.event_type,
      guest,
    };
  }
}

export default ShowExternalGuestService;
