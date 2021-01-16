import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';

@injectable()
class UpdateEventDatesVotingService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(event_id: string): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }
    event.eventDatesVoting = !event.eventDatesVoting;

    const updatedEvent = await this.eventsRepository.save(event);

    return updatedEvent;
  }
}

export default UpdateEventDatesVotingService;
