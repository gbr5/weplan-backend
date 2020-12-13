import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';

interface IRequest {
  event_id: string;
  name: string;
}
@injectable()
class UpdateEventNameService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({ event_id, name }: IRequest): Promise<Event> {
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

    event.name = eventName;
    event.trimmed_name = trimmedName;

    const updatedEvent = await this.eventsRepository.save(event);

    return updatedEvent;
  }
}

export default UpdateEventNameService;
