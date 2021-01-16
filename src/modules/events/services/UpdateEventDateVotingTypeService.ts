import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';
import IEventDatesRepository from '../repositories/IEventDatesRepository';

@injectable()
class UpdateEventDatesVotingService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventDatesRepository')
    private eventDatesRepository: IEventDatesRepository,
  ) {}

  public async execute(
    event_id: string,
    date_voting_type: string,
  ): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }
    if (
      event.date_voting_type === 'many' &&
      date_voting_type === 'single' &&
      event.eventDates.length > 0
    ) {
      Promise.all(
        event.eventDates.map(date => {
          return this.eventDatesRepository.delete(date.id);
        }),
      );
    }
    event.date_voting_type = date_voting_type;

    const updatedEvent = await this.eventsRepository.save(event);

    return updatedEvent;
  }
}

export default UpdateEventDatesVotingService;
