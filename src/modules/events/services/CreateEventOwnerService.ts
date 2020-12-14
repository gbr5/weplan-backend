import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventOwner from '@modules/events/infra/typeorm/entities/EventOwner';
import IEventOwnersRepository from '@modules/events/repositories/IEventOwnersRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';
import IGuestsRepository from '../repositories/IGuestsRepository';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  user_id: string;
  event_id: string;
  owner_id: string;
  description: string;
  number_of_guests: number;
}

@injectable()
class CreateEventOwnerService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventOwnersRepository')
    private ownersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private membersRepository: IEventMembersRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute({
    user_id,
    event_id,
    owner_id,
    description,
    number_of_guests,
  }: IRequest): Promise<EventOwner> {
    const eventExists = await this.eventsRepository.findById(event_id);

    if (!eventExists) {
      throw new AppError('Event not found.');
    }

    const memberExists = await this.membersRepository.findByEventAndMemberId(
      event_id,
      owner_id,
    );

    if (memberExists) {
      throw new AppError(
        'This user is already associated with a member in this event.',
      );
    }

    const eventGuests = await this.guestsRepository.findByEvent(event_id);
    const guestExists = eventGuests.find(
      guest =>
        guest.weplanGuest && guest.weplanGuest.weplanUserGuest.id === owner_id,
    );

    if (guestExists) {
      throw new AppError(
        'This user is already associated with a guest in this event.',
      );
    }

    const ownerExists = await this.ownersRepository.findByEventAndOwnerId(
      event_id,
      owner_id,
    );

    if (ownerExists) {
      throw new AppError('The owner that you have chosen, already exists.');
    }

    const owner = await this.ownersRepository.create({
      event_id,
      owner_id,
      description,
      number_of_guests,
    });

    return owner;
  }
}

export default CreateEventOwnerService;
