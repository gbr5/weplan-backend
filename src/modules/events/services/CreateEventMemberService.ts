import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import EventMember from '@modules/events/infra/typeorm/entities/EventMember';
import IEventMembersRepository from '@modules/events/repositories/IEventMembersRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';
import IGuestsRepository from '../repositories/IGuestsRepository';

interface IRequest {
  user_id: string;
  event_id: string;
  member_id: string;
  number_of_guests: number;
}

@injectable()
class CreateEventMemberService {
  constructor(
    @inject('EventMembersRepository')
    private membersRepository: IEventMembersRepository,

    @inject('EventOwnersRepository')
    private ownersRepository: IEventOwnersRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    user_id,
    event_id,
    member_id,
    number_of_guests,
  }: IRequest): Promise<EventMember> {
    const eventExists = await this.eventsRepository.findById(event_id);

    if (!eventExists) {
      throw new AppError('Event not found.');
    }

    const ownerExists = await this.ownersRepository.findByEventAndOwnerId(
      event_id,
      member_id,
    );

    if (ownerExists) {
      throw new AppError(
        'This user is already associated with a owner of this event.',
      );
    }

    const eventGuests = await this.guestsRepository.findByEvent(event_id);
    const guestExists = eventGuests.find(
      guest =>
        guest.weplanGuest && guest.weplanGuest.weplanUserGuest.id === member_id,
    );

    if (guestExists) {
      throw new AppError(
        'This user is already associated with a guest of this event.',
      );
    }

    const memberExists = await this.membersRepository.findByEventAndMemberId(
      event_id,
      member_id,
    );

    if (memberExists) {
      throw new AppError('The member that you have chosen, already exists.');
    }

    const member = await this.membersRepository.create({
      event_id,
      member_id,
      number_of_guests,
    });

    return member;
  }
}

export default CreateEventMemberService;
