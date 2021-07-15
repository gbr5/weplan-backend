import { injectable, inject } from 'tsyringe';

import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';
import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';
import ICreateEventInfoDTO from '@modules/events/dtos/ICreateEventInfoDTO';
import AppError from '@shared/errors/AppError';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';

@injectable()
class CreateEventInfoService {
  constructor(
    @inject('EventInfosRepository')
    private eventInfoRepository: IEventInfosRepository,

    @inject('EventsRepository')
    private eventRepository: IEventsRepository,

    @inject('EventOwnersRepository')
    private eventOwnerRepository: IEventOwnersRepository,
  ) {}

  public async execute(data: ICreateEventInfoDTO): Promise<EventInfo> {
    console.log({ data });
    const event = await this.eventRepository.findById(data.event_id);
    if (!event) {
      throw new AppError('Event not found!');
    }
    const eventMaster = await this.eventOwnerRepository.findByEventAndOwnerId(
      data.event_id,
      event.user_id,
    );
    if (!eventMaster) {
      throw new AppError('Event master not found!');
    }

    eventMaster.number_of_guests = data.number_of_guests;

    await this.eventOwnerRepository.save(eventMaster);

    const eventInfo = await this.eventInfoRepository.create(data);

    return eventInfo;
  }
}

export default CreateEventInfoService;
