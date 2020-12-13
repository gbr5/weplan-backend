import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventInfoRepository from '../repositories/IEventInfosRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';

interface IRequest {
  event_id: string;
  number_of_guests: number;
  description: string;
}
@injectable()
class UpdateEventMasterService {
  constructor(
    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMembersRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventInfosRepository')
    private eventInfoRepository: IEventInfoRepository,
  ) {}

  public async execute({
    event_id,
    number_of_guests,
    description,
  }: IRequest): Promise<EventOwner> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found.');
    }

    const eventMaster = await this.eventOwnersRepository.findByEventAndOwnerId(
      event_id,
      event.user_id,
    );

    if (!eventMaster) {
      throw new AppError('Event informations not found.');
    }

    const eventOwners = await this.eventOwnersRepository.findByEvent(event_id);
    const eventMembers = await this.eventMembersRepository.findByEvent(
      event_id,
    );

    const ownersGuests = eventOwners
      .map(owner => owner.number_of_guests)
      .reduce((a, b) => Number(a) + Number(b), 0);
    const membersGuests = eventMembers
      .map(member => member.number_of_guests)
      .reduce((a, b) => Number(a) + Number(b), 0);
    const oldNumberOfGuests = ownersGuests + membersGuests;
    const totalNumberOfGuests =
      oldNumberOfGuests + number_of_guests - eventMaster.number_of_guests;
    const updatedEventInfo = await this.eventInfoRepository.findByEvent(
      event.id,
    );
    if (
      updatedEventInfo &&
      totalNumberOfGuests > Number(updatedEventInfo.number_of_guests)
    ) {
      updatedEventInfo.number_of_guests = totalNumberOfGuests;
      await this.eventInfoRepository.save(updatedEventInfo);
    }

    eventMaster.description = description;
    eventMaster.number_of_guests = number_of_guests;

    const updatedEventOwner = await this.eventOwnersRepository.save(
      eventMaster,
    );

    return updatedEventOwner;
  }
}

export default UpdateEventMasterService;
