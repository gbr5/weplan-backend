import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';

import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';

@injectable()
class UpdateEventNumberOfGuestsService {
  constructor(
    @inject('EventInfosRepository')
    private eventInfosRepository: IEventInfosRepository,
  ) {}

  public async execute(
    event_id: string,
    number_of_guests: number,
  ): Promise<EventInfo> {
    const eventInfo = await this.eventInfosRepository.findByEvent(event_id);

    if (!eventInfo) {
      throw new AppError('Event informations not found.');
    }

    eventInfo.number_of_guests = number_of_guests;

    const updatedEventInfo = await this.eventInfosRepository.save(eventInfo);

    return updatedEventInfo;
  }
}

export default UpdateEventNumberOfGuestsService;
