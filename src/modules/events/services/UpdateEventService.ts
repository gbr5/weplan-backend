import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';

interface IRequest {
  user_id: string;
  event_type: string;
  event_id: string;
  name: string;
  date: Date;
}
@injectable()
class UpdateEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    user_id,
    event_type,
    event_id,
    name,
    date,
  }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }
    const eventName = name
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join(' ');

    const trimmedName = name
      .toLowerCase()
      .split(' ')
      .map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      .join('');

    event.user_id = user_id;
    event.event_type = event_type;
    event.name = eventName;
    event.trimmed_name = trimmedName;
    event.date = date;

    const updatedEvent = await this.eventsRepository.save(event);

    return updatedEvent;
  }
}

export default UpdateEventService;
