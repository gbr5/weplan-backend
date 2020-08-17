import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';
import ICreateEventInfoDTO from '@modules/events/dtos/ICreateEventInfoDTO';

import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';

@injectable()
class UpdateEventInfoService {
  constructor(
    @inject('EventInfosRepository')
    private eventInfosRepository: IEventInfosRepository,
  ) {}

  public async execute({
    event_id,
    number_of_guests,
    start_hour,
    duration,
    budget,
    description,
    country,
    local_state,
    city,
  }: ICreateEventInfoDTO): Promise<EventInfo> {
    const eventInfo = await this.eventInfosRepository.findByEvent(event_id);

    if (!eventInfo) {
      throw new AppError('Event informations not found.');
    }

    eventInfo.number_of_guests = number_of_guests;
    eventInfo.start_hour = start_hour;
    eventInfo.duration = duration;
    eventInfo.budget = budget;
    eventInfo.description = description;
    eventInfo.country = country;
    eventInfo.local_state = local_state;
    eventInfo.city = city;

    const updatedEventInfo = await this.eventInfosRepository.save(eventInfo);

    return updatedEventInfo;
  }
}

export default UpdateEventInfoService;
