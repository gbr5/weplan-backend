import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '@modules/events/infra/typeorm/entities/Event';

interface IRequest {
  event_id: string;
  date: Date;
  isDateDefined: boolean;
}

@injectable()
class UpdateEventIsDateDefinedService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    date,
    event_id,
    isDateDefined,
  }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }
    if (isDateDefined) {
      event.date = date;
      event.isDateDefined = true;
    } else {
      event.isDateDefined = false;
    }
    const updatedEvent = await this.eventsRepository.save(event);

    return updatedEvent;
  }
}

export default UpdateEventIsDateDefinedService;
