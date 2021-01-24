import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import Event from '../infra/typeorm/entities/Event';

@injectable()
class ShowEventByNameService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(trimmed_name: string): Promise<Event> {
    const event = await this.eventsRepository.findByName(trimmed_name);

    if (!event) {
      throw new AppError('Event not found.');
    }

    return event;
  }
}

export default ShowEventByNameService;
