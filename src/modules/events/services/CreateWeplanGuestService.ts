import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IGuestsRepository from '../repositories/IGuestsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import IEventOwnersRepository from '../repositories/IEventOwnersRepository';
import IEventMembersRepository from '../repositories/IEventMembersRepository';

interface IRequest {
  user_id: string;
  guest_id: string;
  event_id: string;
}

@injectable()
class CreateWeplanGuestService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,

    @inject('EventOwnersRepository')
    private ownersRepository: IEventOwnersRepository,

    @inject('EventMembersRepository')
    private membersRepository: IEventMembersRepository,
  ) {}

  public async execute({
    user_id,
    guest_id,
    event_id,
  }: IRequest): Promise<WeplanGuest> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError('User not found.');
    }

    const eventExists = await this.eventsRepository.findById(event_id);

    if (!eventExists) {
      throw new AppError('Event not found.');
    }

    const ownerExists = await this.ownersRepository.findByEventAndOwnerId(
      event_id,
      user_id,
    );

    if (ownerExists) {
      throw new AppError(
        'This user is already associated with a owner in this event.',
      );
    }

    const memberExists = await this.membersRepository.findByEventAndMemberId(
      event_id,
      user_id,
    );

    if (memberExists) {
      throw new AppError(
        'This user is already associated with a member in this event.',
      );
    }

    const guestExists = await this.guestsRepository.findByGuestId(guest_id);

    if (!guestExists) {
      throw new AppError('Guest not found.');
    }

    const weplanGuestExists = await this.weplanGuestsRepository.findByEventAndUserId(
      event_id,
      user_id,
    );

    if (weplanGuestExists) {
      throw new AppError('The guest that you have chosen, already exists.');
    }

    guestExists.weplanUser = true;
    guestExists.first_name = userExists.personInfo.first_name;
    guestExists.last_name = userExists.personInfo.last_name;

    const updatedGuest = await this.guestsRepository.save(guestExists);

    if (!updatedGuest.weplanUser) {
      throw new AppError(
        'It was not possible to update guest.weplanUser. Give a shout to ma brother Guy!',
      );
    }

    const guest = await this.weplanGuestsRepository.create({
      user_id,
      guest_id,
      event_id,
    });

    return guest;
  }
}

export default CreateWeplanGuestService;
